import { storageService } from "../async-storage.service";
import { getRandomColor, makeId, sortColorsByHue } from "../util.service";
import { userService } from "../user";


const STORAGE_KEY = "board";

export const boardService = {
  query,
  getById,
  save,
  remove,
  addBoardMsg,
  updateBoard,
  getDefaultFilter,
  getEmptyGroup,
  getEmptyTask,
  getEmptyChecklist,
  getEmptyItem,
  getEmptyBoard,
  getEmptyDueDate,
  getEmptyAttach,
  getAllLabels,
  getEmptyLabel,
  getColorsCover,
  updateActivities
};
window.cs = boardService;

async function query(filterBy = { txt: "" }) {
  var boards = await storageService.query(STORAGE_KEY);

  if (!boards || !boards.length) {
    boards = _createBoards();

    await storageService.post(STORAGE_KEY, boards);
  }
  // const { txt, sortField, sortDir } = filterBy

  // if (txt) {
  //     const regex = new RegExp(filterBy.txt, 'i')
  //     boards = boards.filter(board => regex.test(board.title) || regex.test(board.description))
  // }

  // if (sortField === 'title' || sortField === 'owner') {
  //     boards.sort((board1, board2) => board1[sortField].localeCompare(board2[sortField]) * +sortDir)
  // }

  // boards = boards.map(({ _id, title, owner }) => ({ _id, title, owner }))
  console.log("boards:", boards);

  return boards;
}

async function getById(boardId, filterBy = {}) {
  const board = await storageService.get(STORAGE_KEY, boardId);
  console.log("filterBy:", filterBy);
  if (filterBy.txt) {
    const regex = new RegExp(filterBy.txt, "i");
    board.groups = board.groups.filter((group) => regex.test(group.title));
  }
  if (filterBy.noMembers) {
    board.groups.forEach((group) => {
      group.tasks = group.tasks.filter((task) => !task.members.length);
    });
  }
  if (filterBy.noDueDate) {
    board.groups.forEach((group) => {
      group.tasks = group.tasks.filter((task) => !task.dueDate);
    });
  }
  if (filterBy.noLabels) {
    board.groups.forEach((group) => {
      group.tasks = group.tasks.filter((task) => !task.labels.length);
    });
  }

  if (filterBy.selectMember?.length) {
    console.log("filterBy.selectMember:", filterBy.selectMember);
    board.groups.forEach((group) => {
      group.tasks = group.tasks.filter((task) =>
        task.members.some((member) => filterBy.selectMember.includes(member.id))
      );
    });
  }

  if (filterBy.allMembers) {
    board.groups.forEach((group) => {
      group.tasks = group.tasks.filter(
        (task) => task.members.length === board.members.length
      );
    });
  }
  if (filterBy.selectLabel?.length) {
    console.log("filterBy.selectLabel:", filterBy.selectLabel);
    board.groups.forEach((group) => {
      group.tasks = group.tasks.filter((task) =>
        task.labels.some((label) => filterBy.selectLabel.includes(label))
      );
    });
  }
  return board;
}

function getDefaultFilter() {
  return {
    txt: "",
    noMembers: false,
    selectMember: [],
    noDueDate: false,
    noLabels: false,
    selectLabel: [],
    sortField: "title",
    sortDir: 1,
  };
}

async function remove(boardId) {
  // throw new Error('Nope')
  await storageService.remove(STORAGE_KEY, boardId);
}

async function save(board) {
  var savedBoard;
  if (board._id) {
    savedBoard = await storageService.put(STORAGE_KEY, board);
  } else {
    savedBoard = await storageService.post(STORAGE_KEY, board);
  }
  return savedBoard;
}

async function addBoardMsg(boardId, txt) {
  // Later, this is all done by the backend
  const board = await getById(boardId);

  const msg = {
    id: makeId(),
    by: userService.getLoggedinUser(),
    txt,
  };
  board.msgs.push(msg);
  await storageService.put(STORAGE_KEY, board);

  return msg;
}

function updateBoard(board, groupId, taskId, { key, value }, activity = "") {
  const gIdx = board?.groups?.findIndex((group) => group.id === groupId);
  const tIdx = board?.groups[gIdx]?.tasks.findIndex(
    (task) => task.id === taskId
  );

  if (tIdx >= 0) {
    if (key === "deleteTask") {
      board.groups[gIdx].tasks.splice(tIdx, 1);
    } else {
      board.groups[gIdx].tasks[tIdx][key] = value;
    }
  } else if (gIdx >= 0 && tIdx < 0) {
    if (key === "group") {
      board.groups[gIdx] === value;
    } else if (key === "deleteGroup") {
      board.groups.splice(gIdx, 1);
    } else {
      board.groups[gIdx][key] = value;
    }
  } else {
    board[key] = value;
  }

  if (activity) {
    activity = addActivity(activity);
  }

  save(board);
  return board;
}

async function updateActivities(board, title, type, group, task, checklist, taskNumber, item, dueDate) {
  const activityToAdd = addActivity(title, type, group, task, checklist, taskNumber, item, dueDate)
  console.log(activityToAdd)

  await board.activities.unshift(activityToAdd);
  await save(board);
}

function addActivity(title, type, group, task, checklist, taskNumber, item, dueDate) {
  const activity = {
    id: makeId(),
    title,
    type,
    createdAt: Date.now(),
    byMember: {
      _id: "u101",
      fullname: "Abi Abambi",
      imgUrl: "http://some-img",
      color: '#000'
    },
    group: {
      id: group?.id,
      title: group?.title
    },
    task: {
      id: task.id,
      title: task.title
    },
    taskNumber,
    checklist: {
      id: checklist.id,
      title: checklist.title
    },
    item,
    dueDate: {
      date: dueDate?.date,
      time: dueDate?.time
    }
  };

  return activity
}

function getEmptyGroup() {
  return {
    id: makeId(),
    title: "",
    tasks: [
      {
        id: makeId(),
        title: "",
        labels: [],
        members: [],
        attachments: [],
        comments: [],
        cover: "",
        dueDate: "",
      },
    ],
    style: {},
  };
}

function getEmptyTask() {
  return {
    id: makeId(),
    title: "",
    labels: [],
    members: [],
    attachments: [],
    comments: [],
    cover: "",
    dueDate: "",
  };
}

function getEmptyChecklist() {
  return {
    id: makeId(),
    title: "",
    items: [],
  };
}

async function getEmptyItem() {
  return {
    id: makeId(),
    text: "",
    isChecked: false,
  };
}

function getEmptyBoard() {
  return {
    _id: "",
    title: "",
    isStarred: false,
    // archivedAt: 0,
    createdBy: {
      id: "u102",
      fullname: "",
      imgUrl: "",
    },
    style: {
      backgroundImage: "",
      backgroundColor: "",
    },
    members: [],
    groups: [],
    activities: [],
  };
}

function getEmptyDueDate() {
  return {
    date: "",
    time: "",
    isComplete: false,
    reminder: "",
    createdAt: "",
    completedAt: null,
    isOverdue: false,
  };
}

function getEmptyAttach() {
  return {
    id: makeId(),
    name: "",
    url: "",
    type: "",
    createdAt: new Date(),
  };
}
function getEmptyLabel() {
  return {
    id: makeId(),
    title: "",
    color: "",
    colorName: "",
    isEditable: false,
  };
}
const colors = [
  { id: "A1B2C", title: "", color: "#61BD4F", colorName: "Green" },
  { id: "D3E4F", title: "", color: "#F2D600", colorName: "Yellow" },
  { id: "G5H6I", title: "", color: "#FFAB4A", colorName: "Orange" },
  { id: "J7K8L", title: "", color: "#EB5A46", colorName: "Red" },
  { id: "M9N0O", title: "", color: "#C377E0", colorName: "Purple" },
  { id: "P1Q2R", title: "", color: "#0079BF", colorName: "Blue" },
  { id: "S3T4U", title: "", color: "#00C2E0", colorName: "Sky Blue" }, // Changed from "Light Blue"
  { id: "V5W6X", title: "", color: "#51E898", colorName: "Light Green" },
  { id: "Y7Z8A", title: "", color: "#FF80CE", colorName: "Pink" },
  { id: "B9C0D", title: "", color: "#344563", colorName: "Dark Navy Blue" },
  { id: "E1F2G", title: "", color: "#B6BBBF", colorName: "Gray" }, // Changed from "Light Gray"
  { id: "H3I4J", title: "", color: "#E6C84F", colorName: "Mustard Yellow" },
  { id: "K5L6M", title: "", color: "#CF513D", colorName: "Dark Red" },
  { id: "N7O8P", title: "", color: "#E39E23", colorName: "Dark Orange" },
  { id: "Q9R0S", title: "", color: "#B04632", colorName: "Brick Red" },
  { id: "T1U2V", title: "", color: "#89609E", colorName: "Dark Purple" },
  { id: "W3X4Y", title: "", color: "#055A8C", colorName: "Dark Blue" },
  { id: "Z5A6B", title: "", color: "#1F8A9D", colorName: "Teal" },
  { id: "C7D8E", title: "", color: "#519839", colorName: "Forest Green" },
  { id: "F9G0H", title: "", color: "#D29034", colorName: "Light Orange" },
  { id: "I1J2K", title: "", color: "#C4C9CC", colorName: "Light Gray" }, // Changed from "Light Grayish Blue"
  { id: "L3M4N", title: "", color: "#E4F0F6", colorName: "Pale Blue" },
  { id: "O5P6Q", title: "", color: "#F5DDC0", colorName: "Light Peach" },
  { id: "R7S8T", title: "", color: "#F5C4B1", colorName: "Pale Pink" },
  { id: "U9V0W", title: "", color: "#F3E0AE", colorName: "Soft Yellow" },
  { id: "X1Y2Z", title: "", color: "#ECD7E7", colorName: "Light Lavender" },
  { id: "Z1X2C", title: "", color: "#B7E3E4", colorName: "Light Turquoise" },
  { id: "C2A3B", title: "", color: "#D5F0EC", colorName: "Light Aqua" },
  { id: "D6E7F", title: "", color: "#F6D6D1", colorName: "Soft Red" },
  { id: "G7H8I", title: "", color: "#A4A4A4", colorName: "Gray" },
];

function getColorsCover() {
  return [
    { id: "Z5A6B", color: "#9F8FEF" },
    { id: "C7D8E", color: "#F87168" },
    { id: "F9G0H", color: "#FEA362" },
    { id: "I1J2K", color: "#F5CD47" },
    { id: "L3M4N", color: "#4BCE97" },
    { id: "O5P6Q", color: "#8590A2" },
    { id: "R7S8T", color: "#E774BB" },
    { id: "U9V0W", color: "#94C748" },
    { id: "X1Y2Z", color: "#6CC3E0" },
    { id: "Z1X2C", color: "#579DFF" },
  ]
}
function getAllLabels() {
  const allLabels = colors;
  return sortColorsByHue(allLabels);
}

function _createBoards() {
  return {
    _id: "b101",
    title: "Robot dev proj",
    isStarred: false,
    archivedAt: 1589983468418,
    createdBy: {
      id: "u101",
      fullname: "Abi Abambi",
      imgUrl: "http://some-img",
    },
    style: {
      backgroundImage:
        "https://cdn.pixabay.com/photo/2024/07/05/22/30/penguin-8875750_1280.jpg",
      backgroundColor: "#61bd4f",
    },
    labels: [
      {
        id: makeId(),
        title: "",
        color: "#7F5F01",
        colorName: "Brown",
        isEditable: true,
      },
      {
        id: makeId(),
        title: "",
        color: "#A54800",
        colorName: "Dark Orange",
        isEditable: true,
      },
      {
        id: makeId(),
        title: "",
        color: "#AE2E24",
        colorName: "Red",
        isEditable: true,
      },
      {
        id: makeId(),
        title: "",
        color: "#5E4DB2",
        colorName: "Purple",
        isEditable: true,
      },
      {
        id: makeId(),
        title: "",
        color: "#0055CC",
        colorName: "Blue",
        isEditable: true,
      },
      {
        id: makeId(),
        title: "",
        color: "#206A83",
        colorName: "Teal",
        isEditable: true,
      },
      {
        id: makeId(),
        title: "",
        color: "#A1BDD914",
        colorName: "Light Green",
        isEditable: true,
      },
    ],

    members: [
      {
        id: "u101",
        fullname: "Natia ",
        imgUrl: "https://www.google.com",
        color: "#61bd4f",
      },
      {
        id: "u102",
        fullname: "Avi",
        imgUrl: "https://www.google.com",
        color: "#f2d600",
      },
      {
        id: "u103",
        fullname: "Yana",
        imgUrl: "https://www.google.com",
        color: "#f3a600",
      },
    ],
    groups: [
      {
        id: "g101",
        title: "Design Phase",
        archivedAt: 1589983468418,
        tasks: [
          {
            id: "c101",
            title: "Design wireframes",
            labels: [],
            description: "",
            checklists: [
              {
                id: "chk101",
                title: "Design Process",
                items: [
                  {
                    id: "item101",
                    text: "Gather requirements from the team",
                    isChecked: true,
                  },
                  {
                    id: "item102",
                    text: "Create wireframe sketches",
                    isChecked: false,
                  },
                  {
                    id: "item103",
                    text: "Design high-fidelity mockups",
                    isChecked: false,
                  },
                ],
              },
              {
                id: "chk102",
                title: "Review Process",
                items: [
                  {
                    id: "item201",
                    text: "Review mockups with the team",
                    isChecked: false,
                  },
                  {
                    id: "item202",
                    text: "Make adjustments based on feedback",
                    isChecked: false,
                  },
                ],
              },
            ],
            members: [
              {
                id: "u101",
                fullname: "Natia ",
                imgUrl: "https://www.google.com",
                color: "#61bd4f",
              },
              {
                id: "u102",
                fullname: "Avi",
                imgUrl: "https://www.google.com",
                color: "#f2d600",
              },
            ],
            attachments: '', // שדה attachments ריק
            comments: [
              "Create wireframes for the new Trello feature",
              "Incorporate feedback from the last review",
            ],
            cover:{color:'', img: ''},
            dueDate: "",
          },
          {
            id: "c102",
            title: "Create design mockups",
            labels: [],
            description: "",
            checklists: [
              {
                id: "chk10656",
                title: "Design Process",
                items: [
                  {
                    id: "item101",
                    text: "Gather requirements from the team",
                    isChecked: true,
                  },
                  {
                    id: "item102",
                    text: "Create wireframe sketches",
                    isChecked: false,
                  },
                  {
                    id: "item103",
                    text: "Design high-fidelity mockups",
                    isChecked: false,
                  },
                ],
              },
              {
                id: "chk106252222256",
                title: "Design Process",
                items: [
                  {
                    id: "item101",
                    text: "Gather requirements from the team",
                    isChecked: true,
                  },
                  {
                    id: "item102",
                    text: "Create wireframe sketches",
                    isChecked: false,
                  },
                  {
                    id: "item103",
                    text: "Design high-fidelity mockups",
                    isChecked: false,
                  },
                ],
              },

              {
                id: "chk1022525",
                title: "Review Process",
                items: [
                  {
                    id: "item201",
                    text: "Review mockups with the team",
                    isChecked: false,
                  },
                  {
                    id: "item202",
                    text: "Make adjustments based on feedback",
                    isChecked: false,
                  },
                ],
              },
            ],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Design high-fidelity mockups for the app",
              "Align design with the wireframes",
            ],
            cover:{color:'', img: ''},
          
            dueDate: "",
          },
          {
            id: "c103",
            title: "Design logo",
            labels: [],
            description: "",
            checklists: [
              {
                id: "chk10136352",
                title: "Design Process",
                items: [
                  {
                    id: "item101",
                    text: "Gather requirements from the team",
                    isChecked: true,
                  },
                  {
                    id: "item102",
                    text: "Create wireframe sketches",
                    isChecked: false,
                  },
                  {
                    id: "item103",
                    text: "Design high-fidelity mockups",
                    isChecked: false,
                  },
                ],
              },
              {
                id: "chk333102",
                title: "Review Process",
                items: [
                  {
                    id: "item201",
                    text: "Review mockups with the team",
                    isChecked: false,
                  },
                  {
                    id: "item202",
                    text: "Make adjustments based on feedback",
                    isChecked: false,
                  },
                ],
              },
            ],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Design a logo for the Trello project",
              "Ensure it aligns with the brand identity",
            ],
            cover:{color:'', img: ''},
            dueDate: "",
          },
          {
            id: "c104",
            title: "Create color scheme",
            labels: [],
            description: "",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Develop a color scheme for the app",
              "Use brand colors as a base",
            ],
             cover:{color:'', img: ''},
            dueDate: "",
          },
          {
            id: "c105",
            title: "Design icons",
            labels: [],
            description: "",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Design custom icons for the Trello project",
              "Ensure consistency with the overall design",
            ],
            cover:{color:'', img: ''},
            dueDate: "",
          },
          {
            id: "c106",
            title: "Create typography",
            labels: [],
            description: "",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Select fonts for the project",
              "Ensure readability and aesthetic appeal",
            ],
            cover:{color:'', img: ''},
            dueDate: "",
          },
          {
            id: "c107",
            title: "Develop design system",
            labels: [],
            description: "",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Create a design system for the app",
              "Include guidelines for all design elements",
            ],
             cover:{color:'', img: ''},
            dueDate: "2024-09-30",
          },
          {
            id: "c108",
            title: "Review design with stakeholders",
            labels: [],
            description: "",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Present the design to stakeholders",
              "Incorporate their feedback into the design",
            ],
            cover:{color:'', img: ''},
            dueDate: "",
          },
          {
            id: "c109",
            title: "Finalize design",
            labels: [],
            description: "",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Finalize the design for the Trello project",
              "Prepare for the development phase",
            ],
            cover:{color:'', img: ''},
            dueDate: "2024-10-05",
          },
          {
            id: "c110",
            title: "Handoff design to developers",
            labels: [],
            description: "",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Provide all design assets to the development team",
              "Ensure clear communication during the handoff",
            ],
            cover:{color:'', img: ''},
            dueDate: "",
          },
        ],
        style: {},
      },
      {
        id: "g102",
        title: "Development Phase",
        archivedAt: null,
        tasks: [
          {
            id: "c111",
            title: "Set up development environment",
            labels: [],
            description: "",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Install all necessary tools",
              "Ensure compatibility with the latest tech stack",
            ],
            cover:{color:'', img: ''},
            dueDate: "2024-09-01",
          },
          {
            id: "c112",
            title: "Create project structure",
            labels: [],
            description: "",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Set up the initial project structure",
              "Follow best practices for maintainability",
            ],
            cover:{color:'', img: ''},
            dueDate: "2024-09-05",
          },
        ],
        style: {},
      },

      {
        id: "g103",
        title: "Testing Phase",
        archivedAt: null,
        tasks: [
          {
            id: "c113",
            title: "Write unit tests",
            labels: [],
            description: "Create unit tests for the core functionalities of the application.",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Focus on critical paths",
              "Ensure all edge cases are covered",
            ],
            cover:{color:'', img: ''},
            dueDate: "2024-09-10",
          },
          {
            id: "c114",
            title: "Perform integration testing",
            labels: [],
            description: "Test the integration of different modules to ensure they work together as expected.",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Verify module interactions",
              "Check for data consistency",
            ],
            cover:{color:'', img: ''},
            dueDate: "2024-09-15",
          },
        ],
      },
      {
        id: "g104",
        title: "Deployment Phase",
        archivedAt: null,
        tasks: [
          {
            id: "c115",
            title: "Prepare deployment environment",
            labels: [],
            description: "Set up the environment for deployment, including server configurations and deployment scripts.",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Ensure security configurations are in place",
              "Test deployment scripts",
            ],
            cover:{color:'', img: ''},
            dueDate: "2024-09-20",
          },
        ],
      },
    ],
    activities: [
      {
        id: "a112",
        title: "deleted list group-title",
        type: 'deleteGroup',
        createdAt: 154514,
        byMember: {
          id: "u102",
          fullname: "Avi",
          imgUrl: "http://some-img",
          color: "#f2d600",

        },
        group: {
          id: "g101",
          title: "Design Phase",
        },
      },
      {
        id: "a111",
        title: "deleted card #4 from group-title",
        type: 'deleteTask',
        createdAt: 154514,
        byMember: {
          id: "u102",
          fullname: "Avi",
          imgUrl: "http://some-img",
          color: "#f2d600",

        },
        group: {
          id: "g101",
          title: "Design Phase",
        },
        task: {
          id: "c101",
          title: "Design wireframes",
        }
      },
      {
        id: "a110",
        title: "removed checklist-title",
        type: 'deleteChecklist',
        createdAt: 154514,
        byMember: {
          id: "u101",
          fullname: "Natia",
          imgUrl: "http://some-img",
          color: "#61bd4f",

        },
        group: {
          id: "g101",
          title: "Design Phase",
        },
        task: {
          id: "c101",
          title: "Design wireframes",
        },
        checklist: {
          id: 'ck101',
          title: 'Design Process',
        },
      },
      {
        id: "a109",
        title: "set task-title to be task-due-date",
        type: 'setDueDate',
        createdAt: 154514,
        byMember: {
          id: "u103",
          fullname: "Yana",
          imgUrl: "http://some-img",
          color: "#f3a600",

        },
        group: {
          id: "g101",
          title: "Design Phase",
        },
        task: {
          id: "c101",
          title: "Design wireframes",
        },
        dueDate: {
          date: "2024-09-04",
          time: "01:02"
        }
      },
      {
        id: "a101",
        title: "complete checklist-item-text on task-title",
        type: 'completeChecklistItem',
        createdAt: 154514,
        byMember: {
          id: "u101",
          fullname: "Natia",
          imgUrl: "http://some-img",
          color: "#61bd4f",

        },
        group: {
          id: "g101",
          title: "Design Phase",
        },
        task: {
          id: "c101",
          title: "Design wireframes",
        },
        checklist: {
          id: 'ck101',
          title: 'Design Process',
        },
        item: {
          id: 'item101',
          text: 'Gather requirements from the team',
        }
      },
      {
        id: "a102",
        title: "added checklistt-title to group-title",
        type: 'addChecklist',
        createdAt: 154520,
        byMember: {
          id: "u102",
          fullname: "Avi",
          imgUrl: "http://some-img",
          color: "#f2d600",
        },
        group: {
          id: "g101",
          title: "Design Phase",
        },
        task: {
          id: "c101",
          title: "Design wireframes",
        },
        checklist: {
          id: 'chk101',
          title: 'colors',
        }
      },
      {
        id: "a104",
        title: `added task-title to group-title`,
        type: "addTask",
        createdAt: 154540,
        byMember: {
          id: "u101",
          fullname: "Natia",
          imgUrl: "http://some-img",
          color: "#61bd4f",
        },
        group: {
          id: "g101",
          title: "Design Phase",
        },
        task: {
          id: "c101",
          title: "Design wireframes",
        },
      },
      {
        id: "a103",
        title: `added group-title`,
        type: 'addGroup',
        createdAt: 154530,
        byMember: {
          id: "u103",
          fullname: "Yana",
          imgUrl: "http://some-img",
          color: "#f3a600",
        },
        group: {
          id: "g101",
          title: "Design Phase",
        },
        task: {
          id: "c101",
          title: "Design wireframes",
        },
      },

      {
        id: "a108",
        title: 'added this board to',
        type: 'addBoard',
        createdAt: Date.now(),
        byMember: {
          _id: "u101",
          fullname: "Abi Abambi",
          imgUrl: "http://some-img",
          color: '#000'
        },
        group: {
          id: "g101",
          title: "Design Phase",
        },
        task: {
          id: "c101",
          title: "Design wireframes",
        },
      },
      {
        id: "a107",
        title: 'created this board',
        type: 'createBoard',
        createdAt: Date.now(),
        byMember: {
          _id: "u101",
          fullname: "Abi Abambi",
          imgUrl: "http://some-img",
          color: '#000'
        },
        group: {
          id: "g101",
          title: "Design Phase",
        },
        task: {
          id: "c101",
          title: "Design wireframes",
        },
      },
    ],
  };
}


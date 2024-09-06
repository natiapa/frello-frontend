import { storageService } from "../async-storage.service";
import { getRandomColor, makeId } from "../util.service";
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

function updateActivities(board, action, groupId, groupTitle, taskId, taskTitle) {
  const member = userService.getLoggedinUser()
  board.activities.push({ id: makeId(), byMember: member, createdAt: Date.now(), group: { id: groupId, title: groupTitle }, task: { id: taskId, title: taskTitle }, title: action })

  save(board);
  return board;
}

function addActivity(txt) {
  return (activity = {
    id: utilService.makeId(),
    txt,
    createdAt: Date.now(),
    byMember: {
      _id: "u101",
      fullname: "Abi Abambi",
      imgUrl: "http://some-img",
    },
    type: "add-task",
  });
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
            labels: ["Urgent", "In Progress"],
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
            cover: "cover_wireframes.png",
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
            cover: "cover_mockup.png",
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
            cover: "cover_logo.png",
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
            cover: "cover_color_scheme.png",
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
            cover: "cover_icons.png",
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
            cover: "cover_typography.png",
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
            cover: "cover_design_system.png",
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
            cover: "cover_stakeholder_review.png",
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
            cover: "cover_finalize_design.png",
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
            cover: "cover_design_handoff.png",
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
            cover: "cover_dev_env.png",
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
            cover: "cover_project_structure.png",
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
            labels: ["In Progress"],
            description: "Create unit tests for the core functionalities of the application.",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Focus on critical paths",
              "Ensure all edge cases are covered",
            ],
            cover: "cover_unit_tests.png",
            dueDate: "2024-09-10",
          },
          {
            id: "c114",
            title: "Perform integration testing",
            labels: ["Urgent", "Important"],
            description: "Test the integration of different modules to ensure they work together as expected.",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Verify module interactions",
              "Check for data consistency",
            ],
            cover: "cover_integration_testing.png",
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
            labels: ["Important"],
            description: "Set up the environment for deployment, including server configurations and deployment scripts.",
            checklists: [],
            members: [],
            attachments: '', // שדה attachments ריק
            comments: [
              "Ensure security configurations are in place",
              "Test deployment scripts",
            ],
            cover: "cover_deployment_environment.png",
            dueDate: "2024-09-20",
          },
        ],
      },
    ],
    activities: [
      {
        id: "a101",
        title: "Changed Color",
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
      },
      {
        id: "a102",
        title: "Updated Task Description",
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
      },
      {
        id: "a103",
        title: "Moved Task to Review",
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
        id: "a104",
        title: "Moved Task to Review",
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
    ],
  };
}

// function _createBoards() {
//   return {
//     _id: "b101",
//     title: "Robot dev proj",
//     isStarred: false,
//     archivedAt: 1589983468418,
//     createdBy: {
//       id: "u101",
//       fullname: "Abi Abambi",
//       imgUrl: "http://some-img",
//     },
//     style: {
//       backgroundImage:
//         "https://cdn.pixabay.com/photo/2024/07/05/22/30/penguin-8875750_1280.jpg",
//       backgroundColor: "#61bd4f",
//     },
//     members: [
//       {
//         id: "u101",
//         fullname: "Natia ",
//         imgUrl: "https://www.google.com",
//         color: "#61bd4f",
//       },
//       {
//         id: "u102",
//         fullname: "Avi",
//         imgUrl: "https://www.google.com",
//         color: "#f2d600",
//       },
//       {
//         id: "u103",
//         fullname: "Yana",
//         imgUrl: "https://www.google.com",
//         color: "#f3a600",
//       },
//     ],
//     groups: [
//       {
//         id: "g101",
//         title: "Design Phase",
//         archivedAt: 1589983468418,
//         tasks: [
//           {
//             id: "c101",
//             title: "Design wireframes",
//             labels: ["Urgent", "In Progress"],
//             description: "",
//             checklists: [
//               {
//                 id: "chk101",
//                 title: "Design Process",
//                 items: [
//                   {
//                     id: "item101",
//                     text: "Gather requirements from the team",
//                     isChecked: true,
//                   },
//                   {
//                     id: "item102",
//                     text: "Create wireframe sketches",
//                     isChecked: false,
//                   },
//                   {
//                     id: "item103",
//                     text: "Design high-fidelity mockups",
//                     isChecked: false,
//                   },
//                 ],
//               },
//               {
//                 id: "chk102",
//                 title: "Review Process",
//                 items: [
//                   {
//                     id: "item201",
//                     text: "Review mockups with the team",
//                     isChecked: false,
//                   },
//                   {
//                     id: "item202",
//                     text: "Make adjustments based on feedback",
//                     isChecked: false,
//                   },
//                 ],
//               },
//             ],
//             members: [
//               {
//                 id: "u101",
//                 fullname: "Natia ",
//                 imgUrl: "https://www.google.com",
//                 color: "#61bd4f",
//               },
//               {
//                 id: "u102",
//                 fullname: "Avi",
//                 imgUrl: "https://www.google.com",
//                 color: "#f2d600",
//               },
//               // {
//               //     id: 'u103',
//               //     fullname: 'Yana',
//               //     imgUrl: 'https://www.google.com',
//               //     color: '#f3a600',
//               // },
//             ],
//             attachments: ["wireframes_v1.png", "wireframes_v2.png"],
//             comments: [
//               "Create wireframes for the new Trello feature",
//               "Incorporate feedback from the last review",
//             ],
//             cover: "cover_wireframes.png",
//             dueDate: "",
//           },
//           {
//             id: "c102",
//             title: "Create design mockups",
//             labels: [],
//             // labels: ['Review', 'Important'],
//             description: "",
//             checklists: [
//               {
//                 id: "chk10656",
//                 title: "Design Process",
//                 items: [
//                   {
//                     id: "item101",
//                     text: "Gather requirements from the team",
//                     isChecked: true,
//                   },
//                   {
//                     id: "item102",
//                     text: "Create wireframe sketches",
//                     isChecked: false,
//                   },
//                   {
//                     id: "item103",
//                     text: "Design high-fidelity mockups",
//                     isChecked: false,
//                   },
//                 ],
//               },
//               {
//                 id: "chk106252222256",
//                 title: "Design Process",
//                 items: [
//                   {
//                     id: "item101",
//                     text: "Gather requirements from the team",
//                     isChecked: true,
//                   },
//                   {
//                     id: "item102",
//                     text: "Create wireframe sketches",
//                     isChecked: false,
//                   },
//                   {
//                     id: "item103",
//                     text: "Design high-fidelity mockups",
//                     isChecked: false,
//                   },
//                 ],
//               },
//               {
//                 id: "chk1022525",
//                 title: "Review Process",
//                 items: [
//                   {
//                     id: "item201",
//                     text: "Review mockups with the team",
//                     isChecked: false,
//                   },
//                   {
//                     id: "item202",
//                     text: "Make adjustments based on feedback",
//                     isChecked: false,
//                   },
//                 ],
//               },
//             ],
//             members: [
//               // { fullname: 'John Doe', color: getRandomColor() },
//               // { fullname: 'Jane Smith', color: getRandomColor() },
//             ],
//             attachments: ["mockup_v1.png"],
//             comments: [
//               "Design high-fidelity mockups for the app",
//               "Align design with the wireframes",
//             ],
//             cover: "cover_mockup.png",
//             dueDate: "",
//           },
//           {
//             id: "c103",
//             title: "Design logo",
//             labels: [],
//             // labels: ['Low Priority', 'Completed'],
//             description: "",
//             checklists: [
//               {
//                 id: "chk10136352",
//                 title: "Design Process",
//                 items: [
//                   {
//                     id: "item101",
//                     text: "Gather requirements from the team",
//                     isChecked: true,
//                   },
//                   {
//                     id: "item102",
//                     text: "Create wireframe sketches",
//                     isChecked: false,
//                   },
//                   {
//                     id: "item103",
//                     text: "Design high-fidelity mockups",
//                     isChecked: false,
//                   },
//                 ],
//               },
//               {
//                 id: "chk333102",
//                 title: "Review Process",
//                 items: [
//                   {
//                     id: "item201",
//                     text: "Review mockups with the team",
//                     isChecked: false,
//                   },
//                   {
//                     id: "item202",
//                     text: "Make adjustments based on feedback",
//                     isChecked: false,
//                   },
//                 ],
//               },
//             ],
//             members: [
//               // { fullname: 'John Doe', color: getRandomColor() },
//               // { fullname: 'Jane Smith', color: getRandomColor() },
//             ],
//             attachments: ["logo_v1.png"],
//             comments: [
//               "Design a logo for the Trello project",
//               "Ensure it aligns with the brand identity",
//             ],
//             cover: "cover_logo.png",
//             dueDate: "",
//           },
//           {
//             id: "c104",
//             title: "Create color scheme",
//             labels: [],
//             // labels: ['Review', 'On Hold'],
//             description: "",
//             checklists: [],
//             members: [
//               // { fullname: 'John Doe', color: getRandomColor() },
//               // { fullname: 'Jane Smith', color: getRandomColor() },
//             ],
//             attachments: ["color_scheme_v1.png"],
//             comments: [
//               "Develop a color scheme for the app",
//               "Use brand colors as a base",
//             ],
//             cover: "cover_color_scheme.png",
//             dueDate: "",
//           },
//           {
//             id: "c105",
//             title: "Design icons",
//             labels: [],
//             // labels: ['Important', 'Completed'],
//             description: "",
//             checklists: [],
//             members: [
//               // { fullname: 'John Doe', color: getRandomColor() },
//               // { fullname: 'Jane Smith', color: getRandomColor() },
//             ],
//             attachments: ["icons_v1.png"],
//             comments: [
//               "Design custom icons for the Trello project",
//               "Ensure consistency with the overall design",
//             ],
//             cover: "cover_icons.png",
//             dueDate: "",
//           },
//           {
//             id: "c106",
//             title: "Create typography",
//             labels: [],
//             // labels: ['Review', 'Low Priority'],
//             description: "",
//             checklists: [],
//             members: [
//               // { fullname: 'John Doe', color: getRandomColor() },
//               // { fullname: 'Jane Smith', color: getRandomColor() },
//             ],
//             attachments: ["typography_v1.png"],
//             comments: [
//               "Select fonts for the project",
//               "Ensure readability and aesthetic appeal",
//             ],
//             cover: "cover_typography.png",
//             dueDate: "",
//           },
//           {
//             id: "c107",
//             title: "Develop design system",
//             labels: [],
//             // labels: ['In Progress', 'Review'],
//             description: "",
//             checklists: [],
//             members: [
//               // { fullname: 'John Doe', color: getRandomColor() },
//               // { fullname: 'Jane Smith', color: getRandomColor() },
//             ],
//             attachments: ["design_system_v1.pdf"],
//             comments: [
//               "Create a design system for the app",
//               "Include guidelines for all design elements",
//             ],
//             cover: "cover_design_system.png",
//             dueDate: "2024-09-30",
//           },
//           {
//             id: "c108",
//             title: "Review design with stakeholders",
//             labels: [],
//             // labels: ['Important', 'On Hold'],
//             description: "",
//             checklists: [],
//             members: [
//               // { fullname: 'John Doe', color: getRandomColor() },
//               // { fullname: 'Jane Smith', color: getRandomColor() },
//             ],
//             attachments: ["stakeholder_review_notes.pdf"],
//             comments: [
//               "Present the design to stakeholders",
//               "Incorporate their feedback into the design",
//             ],
//             cover: "cover_stakeholder_review.png",
//             dueDate: "",
//           },
//           {
//             id: "c109",
//             title: "Finalize design",
//             labels: [],
//             // labels: ['Review', 'Completed'],
//             description: "",
//             checklists: [],
//             members: [
//               // { fullname: 'John Doe', color: getRandomColor() },
//               // { fullname: 'Jane Smith', color: getRandomColor() },
//             ],
//             attachments: ["final_design_v1.png"],
//             comments: [
//               "Finalize the design for the Trello project",
//               "Prepare for the development phase",
//             ],
//             cover: "cover_finalize_design.png",
//             dueDate: "2024-10-05",
//           },
//           {
//             id: "c110",
//             title: "Handoff design to developers",
//             labels: [],
//             // labels: ['Important', 'In Progress'],
//             description: "",
//             checklists: [],
//             members: [
//               // { fullname: 'John Doe', color: getRandomColor() },
//               // { fullname: 'Jane Smith', color: getRandomColor() },
//             ],
//             attachments: ["design_handoff.pdf"],
//             comments: [
//               "Provide all design assets to the development team",
//               "Ensure clear communication during the handoff",
//             ],
//             cover: "cover_design_handoff.png",
//             dueDate: "",
//           },
//         ],
//         style: {},
//       },
//       {
//         id: "g102",
//         title: "Development Phase",
//         archivedAt: null,
//         tasks: [
//           {
//             id: "c111",
//             title: "Set up development environment",
//             labels: [],
//             // labels: ['Urgent', 'In Progress'],
//             description: "",
//             checklists: [],
//             members: [
//               // { fullname: 'John Doe', color: getRandomColor() },
//               // { fullname: 'Jane Smith', color: getRandomColor() },
//             ],
//             attachments: ["dev_environment_setup.pdf"],
//             comments: [
//               "Install all necessary tools",
//               "Ensure compatibility with the latest tech stack",
//             ],
//             cover: "cover_dev_env.png",
//             dueDate: "2024-09-01",
//           },
//           {
//             id: "c112",
//             title: "Create project structure",
//             labels: [],
//             // labels: ['Review', 'Important'],
//             description: "",
//             checklists: [],
//             members: [
//               // { fullname: 'John Doe', color: getRandomColor() },
//               // { fullname: 'Jane Smith', color: getRandomColor() },
//             ],
//             attachments: ["project_structure.pdf"],
//             comments: [
//               "Set up the initial project structure",
//               "Follow best practices for maintainability",
//             ],
//             cover: "cover_project_structure.png",
//             dueDate: "2024-09-05",
//           },
//         ],
//         style: {},
//       },

//       {
//         id: "g103",
//         title: "Testing Phase",
//         archivedAt: null,
//         tasks: [
//           {
//             id: "c113",
//             title: "Write unit tests",
//             labels: ["In Progress"],
//             description:
//               "Create unit tests for the core functionalities of the application.",
//             checklists: [],
//             members: [],
//             attachments: ["unit_tests_guide.pdf"],
//             comments: [
//               "Focus on critical paths",
//               "Ensure all edge cases are covered",
//             ],
//             cover: "cover_unit_tests.png",
//             dueDate: "2024-09-10",
//           },
//           {
//             id: "c114",
//             title: "Perform integration testing",
//             labels: ["Urgent", "Important"],
//             description:
//               "Test the integration of different modules to ensure they work together as expected.",
//             checklists: [],
//             members: [],
//             attachments: ["integration_testing_plan.pdf"],
//             comments: [
//               "Verify module interactions",
//               "Check for data consistency",
//             ],
//             cover: "cover_integration_testing.png",
//             dueDate: "2024-09-15",
//           },
//         ],
//       },
//       {
//         id: "g104",
//         title: "Deployment Phase",
//         archivedAt: null,
//         tasks: [
//           {
//             id: "c115",
//             title: "Prepare deployment environment",
//             labels: ["Important"],
//             description:
//               "Set up the environment for deployment, including server configurations and deployment scripts.",
//             checklists: [],
//             members: [],
//             attachments: ["deployment_environment_setup.pdf"],
//             comments: [
//               "Ensure security configurations are in place",
//               "Test deployment scripts",
//             ],
//             cover: "cover_deployment_environment.png",
//             dueDate: "2024-09-20",
//           },
//         ],
//       },
//     ],
//     activities: [
//       {
//         id: "a101",
//         title: "Changed Color",
//         createdAt: 154514,
//         byMember: {
//           id: "u101",
//           fullname: "Natia",
//           imgUrl: "http://some-img",
//         },
//         group: {
//           id: "g101",
//           title: "Design Phase",
//         },
//         task: {
//           id: "c101",
//           title: "Design wireframes",
//         },
//       },
//       {
//         id: "a102",
//         title: "Updated Task Description",
//         createdAt: 154520,
//         byMember: {
//           id: "u102",
//           fullname: "Avi",
//           imgUrl: "http://some-img",
//         },
//         group: {
//           id: "g101",
//           title: "Design Phase",
//         },
//         task: {
//           id: "c101",
//           title: "Design wireframes",
//         },
//       },
//       {
//         id: "a103",
//         title: "Moved Task to Review",
//         createdAt: 154530,
//         byMember: {
//           id: "u103",
//           fullname: "Yana",
//           imgUrl: "http://some-img",
//         },
//         group: {
//           id: "g101",
//           title: "Design Phase",
//         },
//         task: {
//           id: "c101",
//           title: "Design wireframes",
//         },
//       },
//       {
//         id: "a104",
//         title: "Moved Task to Review",
//         createdAt: 154540,
//         byMember: {
//           id: "u101",
//           fullname: "Natia",
//           imgUrl: "http://some-img",
//         },
//         group: {
//           id: "g101",
//           title: "Design Phase",
//         },
//         task: {
//           id: "c101",
//           title: "Design wireframes",
//         },
//       },
//     ],
//   };
// }

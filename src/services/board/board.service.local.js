import { storageService } from '../async-storage.service'
import { getRandomColor, makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'board'

export const boardService = {
    query,
    getById,
    save,
    remove,

    addBoardMsg,
    updateBoard,
    getEmptyGroup,
    getEmptyItem
}
window.cs = boardService

async function query(filterBy = { txt: '' }) {
    var boards = await storageService.query(STORAGE_KEY)

    if (!boards || !boards.length) {
        boards = {
            _id: 'b101',
            title: 'Robot dev proj',
            isStarred: false,
            archivedAt: 1589983468418,
            createdBy: {
                id: 'u101',
                fullname: 'Abi Abambi',
                imgUrl: 'http://some-img',
            },
            style: {
                backgroundImage: "https://cdn.pixabay.com/photo/2024/07/05/22/30/penguin-8875750_1280.jpg",
                backgroundColor: '#61bd4f',
            },
            members: [
                {
                    id: 'u101',
                    fullname: 'Tal Taltal',
                    imgUrl: 'https://www.google.com',
                },
                {
                    id: 'u102',
                    fullname: 'Josh Ga',
                    imgUrl: 'https://www.google.com',
                },
            ],
            groups: [
                {
                    id: 'g101',
                    title: 'Design Phase',
                    archivedAt: 1589983468418,
                    tasks: [
                        {
                            id: 'c101',
                            title: 'Design wireframes',
                            labels: ['Urgent', 'In Progress'],
                            description: '',
                            checklists: [
                                {
                                    id: 'chk101',
                                    title: 'Design Process',
                                    items: [
                                        {
                                            id: 'item101',
                                            text: 'Gather requirements from the team',
                                            isChecked: true,
                                        },
                                        {
                                            id: 'item102',
                                            text: 'Create wireframe sketches',
                                            isChecked: false,
                                        },
                                        {
                                            id: 'item103',
                                            text: 'Design high-fidelity mockups',
                                            isChecked: false,
                                        }
                                    ]
                                },
                                {
                                    id: 'chk102',
                                    title: 'Review Process',
                                    items: [
                                        {
                                            id: 'item201',
                                            text: 'Review mockups with the team',
                                            isChecked: false,
                                        },
                                        {
                                            id: 'item202',
                                            text: 'Make adjustments based on feedback',
                                            isChecked: false,
                                        }
                                    ]
                                }
                            ],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['wireframes_v1.png', 'wireframes_v2.png'],
                            comments: ['Create wireframes for the new Trello feature', 'Incorporate feedback from the last review'],
                            cover: 'cover_wireframes.png',
                            dueDate: '2024-09-01',
                        },
                        {
                            id: 'c102',
                            title: 'Create design mockups',
                            labels: ['Review', 'Important'],
                            description: '',
                            checklists: [
                                {
                                    id: 'chk10656',
                                    title: 'Design Process',
                                    items: [
                                        {
                                            id: 'item101',
                                            text: 'Gather requirements from the team',
                                            isChecked: true,
                                        },
                                        {
                                            id: 'item102',
                                            text: 'Create wireframe sketches',
                                            isChecked: false,
                                        },
                                        {
                                            id: 'item103',
                                            text: 'Design high-fidelity mockups',
                                            isChecked: false,
                                        }
                                    ]
                                },
                                {
                                    id: 'chk106252222256',
                                    title: 'Design Process',
                                    items: [
                                        {
                                            id: 'item101',
                                            text: 'Gather requirements from the team',
                                            isChecked: true,
                                        },
                                        {
                                            id: 'item102',
                                            text: 'Create wireframe sketches',
                                            isChecked: false,
                                        },
                                        {
                                            id: 'item103',
                                            text: 'Design high-fidelity mockups',
                                            isChecked: false,
                                        }
                                    ]
                                },
                                {
                                    id: 'chk1022525',
                                    title: 'Review Process',
                                    items: [
                                        {
                                            id: 'item201',
                                            text: 'Review mockups with the team',
                                            isChecked: false,
                                        },
                                        {
                                            id: 'item202',
                                            text: 'Make adjustments based on feedback',
                                            isChecked: false,
                                        }
                                    ]
                                }
                            ],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['mockup_v1.png'],
                            comments: ['Design high-fidelity mockups for the app', 'Align design with the wireframes'],
                            cover: 'cover_mockup.png',
                            dueDate: '2024-09-05',
                        },
                        {
                            id: 'c103',
                            title: 'Design logo',
                            labels: ['Low Priority', 'Completed'],
                            description: '',
                            checklists: [
                                {
                                    id: 'chk10136352',
                                    title: 'Design Process',
                                    items: [
                                        {
                                            id: 'item101',
                                            text: 'Gather requirements from the team',
                                            isChecked: true,
                                        },
                                        {
                                            id: 'item102',
                                            text: 'Create wireframe sketches',
                                            isChecked: false,
                                        },
                                        {
                                            id: 'item103',
                                            text: 'Design high-fidelity mockups',
                                            isChecked: false,
                                        }
                                    ]
                                },
                                {
                                    id: 'chk333102',
                                    title: 'Review Process',
                                    items: [
                                        {
                                            id: 'item201',
                                            text: 'Review mockups with the team',
                                            isChecked: false,
                                        },
                                        {
                                            id: 'item202',
                                            text: 'Make adjustments based on feedback',
                                            isChecked: false,
                                        }
                                    ]
                                }
                            ],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['logo_v1.png'],
                            comments: ['Design a logo for the Trello project', 'Ensure it aligns with the brand identity'],
                            cover: 'cover_logo.png',
                            dueDate: '2024-09-10',
                        },
                        {
                            id: 'c104',
                            title: 'Create color scheme',
                            labels: ['Review', 'On Hold'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['color_scheme_v1.png'],
                            comments: ['Develop a color scheme for the app', 'Use brand colors as a base'],
                            cover: 'cover_color_scheme.png',
                            dueDate: '2024-09-15',
                        },
                        {
                            id: 'c105',
                            title: 'Design icons',
                            labels: ['Important', 'Completed'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['icons_v1.png'],
                            comments: ['Design custom icons for the Trello project', 'Ensure consistency with the overall design'],
                            cover: 'cover_icons.png',
                            dueDate: '2024-09-20',
                        },
                        {
                            id: 'c106',
                            title: 'Create typography',
                            labels: ['Review', 'Low Priority'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['typography_v1.png'],
                            comments: ['Select fonts for the project', 'Ensure readability and aesthetic appeal'],
                            cover: 'cover_typography.png',
                            dueDate: '2024-09-25',
                        },
                        {
                            id: 'c107',
                            title: 'Develop design system',
                            labels: ['In Progress', 'Review'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['design_system_v1.pdf'],
                            comments: ['Create a design system for the app', 'Include guidelines for all design elements'],
                            cover: 'cover_design_system.png',
                            dueDate: '2024-09-30',
                        },
                        {
                            id: 'c108',
                            title: 'Review design with stakeholders',
                            labels: ['Important', 'On Hold'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['stakeholder_review_notes.pdf'],
                            comments: ['Present the design to stakeholders', 'Incorporate their feedback into the design'],
                            cover: 'cover_stakeholder_review.png',
                            dueDate: '2024-10-01',
                        },
                        {
                            id: 'c109',
                            title: 'Finalize design',
                            labels: ['Review', 'Completed'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['final_design_v1.png'],
                            comments: ['Finalize the design for the Trello project', 'Prepare for the development phase'],
                            cover: 'cover_finalize_design.png',
                            dueDate: '2024-10-05',
                        },
                        {
                            id: 'c110',
                            title: 'Handoff design to developers',
                            labels: ['Important', 'In Progress'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['design_handoff.pdf'],
                            comments: ['Provide all design assets to the development team', 'Ensure clear communication during the handoff'],
                            cover: 'cover_design_handoff.png',
                            dueDate: '2024-10-10',
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g102',
                    title: 'Development Phase',
                    archivedAt: null,
                    tasks: [
                        {
                            id: 'c111',
                            title: 'Set up development environment',
                            labels: ['Urgent', 'In Progress'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['dev_environment_setup.pdf'],
                            comments: ['Install all necessary tools', 'Ensure compatibility with the latest tech stack'],
                            cover: 'cover_dev_env.png',
                            dueDate: '2024-09-01',
                        },
                        {
                            id: 'c112',
                            title: 'Create project structure',
                            labels: ['Review', 'Important'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['project_structure.pdf'],
                            comments: ['Set up the initial project structure', 'Follow best practices for maintainability'],
                            cover: 'cover_project_structure.png',
                            dueDate: '2024-09-05',
                        },
                        {
                            id: 'c113',
                            title: 'Implement authentication',
                            labels: ['Completed', 'Important'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['auth_implementation.pdf'],
                            comments: ['Implement user authentication', 'Include login, signup, and password reset features'],
                            cover: 'cover_auth.png',
                            dueDate: '2024-09-10',
                        },
                        {
                            id: 'c114',
                            title: 'Develop API endpoints',
                            labels: ['Review', 'In Progress'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['api_endpoints_v1.pdf'],
                            comments: ['Develop RESTful API endpoints for the app', 'Ensure secure and efficient data handling'],
                            cover: 'cover_api_endpoints.png',
                            dueDate: '2024-09-15',
                        },
                        {
                            id: 'c115',
                            title: 'Implement state management',
                            labels: ['Important', 'On Hold'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['state_management_plan.pdf'],
                            comments: ['Set up state management using Redux', 'Ensure a scalable architecture'],
                            cover: 'cover_state_management.png',
                            dueDate: '2024-09-20',
                        },
                        {
                            id: 'c116',
                            title: 'Integrate with Trello API',
                            labels: ['Review', 'Low Priority'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['trello_api_integration_guide.pdf'],
                            comments: ['Integrate the app with the Trello API', 'Ensure seamless synchronization with Trello'],
                            cover: 'cover_trello_api.png',
                            dueDate: '2024-09-25',
                        },
                        {
                            id: 'c117',
                            title: 'Develop frontend components',
                            labels: ['In Progress', 'Review'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['frontend_components_v1.pdf'],
                            comments: ['Develop reusable frontend components', 'Ensure they follow the design system'],
                            cover: 'cover_frontend_components.png',
                            dueDate: '2024-09-30',
                        },
                        {
                            id: 'c118',
                            title: 'Implement drag-and-drop feature',
                            labels: ['Important', 'On Hold'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['drag_and_drop_implementation.pdf'],
                            comments: ['Implement drag-and-drop functionality for tasks', 'Ensure smooth user experience'],
                            cover: 'cover_drag_and_drop.png',
                            dueDate: '2024-10-01',
                        },
                        {
                            id: 'c119',
                            title: 'Connect frontend to backend',
                            labels: ['Review', 'Completed'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['frontend_backend_integration.pdf'],
                            comments: ['Integrate frontend components with the backend', 'Ensure data flows correctly between the two'],
                            cover: 'cover_frontend_backend.png',
                            dueDate: '2024-10-05',
                        },
                        {
                            id: 'c120',
                            title: 'Deploy application',
                            labels: ['Urgent', 'In Progress'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['deployment_guide.pdf'],
                            comments: ['Deploy the application to the cloud', 'Ensure it is accessible to all users'],
                            cover: 'cover_deployment.png',
                            dueDate: '2024-10-10',
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g103',
                    title: 'Testing Phase',
                    archivedAt: null,
                    tasks: [
                        {
                            id: 'c121',
                            title: 'Write unit tests',
                            labels: ['Review', 'Important'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['unit_tests_code.js'],
                            comments: ['Write unit tests for core components', 'Achieve at least 90% coverage'],
                            cover: 'cover_unit_tests.png',
                            dueDate: '2024-09-01',
                        },
                        {
                            id: 'c122',
                            title: 'Perform integration tests',
                            labels: ['Completed', 'Review'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['integration_tests_plan.pdf'],
                            comments: ['Perform integration tests for the app', 'Ensure all components work together seamlessly'],
                            cover: 'cover_integration_tests.png',
                            dueDate: '2024-09-05',
                        },
                        {
                            id: 'c123',
                            title: 'Conduct end-to-end tests',
                            labels: ['Urgent', 'In Progress'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['e2e_tests_plan.pdf'],
                            comments: ['Conduct end-to-end tests to ensure the entire app works as expected', 'Test all user flows'],
                            cover: 'cover_e2e_tests.png',
                            dueDate: '2024-09-10',
                        },
                        {
                            id: 'c124',
                            title: 'Write test automation scripts',
                            labels: ['Review', 'On Hold'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['test_automation_scripts.js'],
                            comments: ['Develop scripts to automate testing processes', 'Focus on repetitive and critical tests'],
                            cover: 'cover_test_automation.png',
                            dueDate: '2024-09-15',
                        },
                        {
                            id: 'c125',
                            title: 'Test API endpoints',
                            labels: ['Important', 'Low Priority'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['api_testing_plan.pdf'],
                            comments: ['Test all API endpoints for correctness and performance', 'Include security checks'],
                            cover: 'cover_api_testing.png',
                            dueDate: '2024-09-20',
                        },
                        {
                            id: 'c126',
                            title: 'Perform load testing',
                            labels: ['Review', 'Important'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['load_testing_plan.pdf'],
                            comments: ['Conduct load testing to evaluate performance under stress', 'Identify potential bottlenecks'],
                            cover: 'cover_load_testing.png',
                            dueDate: '2024-09-25',
                        },
                        {
                            id: 'c127',
                            title: 'Test UI responsiveness',
                            labels: ['Urgent', 'Review'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['ui_responsiveness_testing_plan.pdf'],
                            comments: ['Test the app’s responsiveness across different devices and screen sizes', 'Ensure a consistent user experience'],
                            cover: 'cover_ui_responsiveness.png',
                            dueDate: '2024-09-30',
                        },
                        {
                            id: 'c128',
                            title: 'Fix identified bugs',
                            labels: ['In Progress', 'Completed'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['bug_report_v1.pdf'],
                            comments: ['Fix all bugs identified during testing', 'Prioritize critical issues'],
                            cover: 'cover_bug_fixing.png',
                            dueDate: '2024-10-01',
                        },
                        {
                            id: 'c129',
                            title: 'Conduct security testing',
                            labels: ['Important', 'Review'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['security_testing_plan.pdf'],
                            comments: ['Test the app for security vulnerabilities', 'Ensure data protection and compliance with standards'],
                            cover: 'cover_security_testing.png',
                            dueDate: '2024-10-05',
                        },
                        {
                            id: 'c130',
                            title: 'Perform final regression testing',
                            labels: ['Urgent', 'In Progress'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['regression_testing_plan.pdf'],
                            comments: ['Perform regression testing to ensure no new bugs have been introduced', 'Retest all critical areas'],
                            cover: 'cover_regression_testing.png',
                            dueDate: '2024-10-10',
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g104',
                    title: 'QA Phase',
                    archivedAt: null,
                    tasks: [
                        {
                            id: 'c131',
                            title: 'Create test cases',
                            labels: ['Low Priority', 'Review'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['test_cases_v1.docx'],
                            comments: ['Document all test cases for the Trello app', 'Ensure coverage for all features'],
                            cover: 'cover_test_cases.png',
                            dueDate: '2024-09-01',
                        },
                        {
                            id: 'c132',
                            title: 'Review test results',
                            labels: ['Review', 'Completed'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['test_results_review.pdf'],
                            comments: ['Analyze test results and determine the quality of the app', 'Identify areas for improvement'],
                            cover: 'cover_test_results.png',
                            dueDate: '2024-09-05',
                        },
                        {
                            id: 'c133',
                            title: 'Prepare test environment',
                            labels: ['Urgent', 'In Progress'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['test_environment_setup.pdf'],
                            comments: ['Set up the environment needed for testing', 'Ensure all necessary tools and data are available'],
                            cover: 'cover_test_environment.png',
                            dueDate: '2024-09-10',
                        },
                        {
                            id: 'c134',
                            title: 'Conduct QA reviews',
                            labels: ['Review', 'Important'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['qa_review_notes.pdf'],
                            comments: ['Conduct quality assurance reviews with the team', 'Discuss any issues found and how to address them'],
                            cover: 'cover_qa_review.png',
                            dueDate: '2024-09-15',
                        },
                        {
                            id: 'c135',
                            title: 'Document test processes',
                            labels: ['Important', 'Completed'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['test_process_documentation.pdf'],
                            comments: ['Document all QA processes for future reference', 'Ensure it is clear and comprehensive'],
                            cover: 'cover_test_documentation.png',
                            dueDate: '2024-09-20',
                        },
                        {
                            id: 'c136',
                            title: 'Manage test data',
                            labels: ['Low Priority', 'On Hold'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['test_data_management_plan.pdf'],
                            comments: ['Organize and manage test data efficiently', 'Ensure data integrity and accuracy'],
                            cover: 'cover_test_data.png',
                            dueDate: '2024-09-25',
                        },
                        {
                            id: 'c137',
                            title: 'Prepare QA report',
                            labels: ['Review', 'Important'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['qa_report_v1.pdf'],
                            comments: ['Prepare a detailed QA report for stakeholders', 'Include key findings and recommendations'],
                            cover: 'cover_qa_report.png',
                            dueDate: '2024-09-30',
                        },
                        {
                            id: 'c138',
                            title: 'Organize QA meetings',
                            labels: ['In Progress', 'Urgent'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['qa_meeting_agenda.pdf'],
                            comments: ['Schedule and organize QA meetings with the team', 'Ensure all members are prepared'],
                            cover: 'cover_qa_meeting.png',
                            dueDate: '2024-10-01',
                        },
                        {
                            id: 'c139',
                            title: 'Review QA tools',
                            labels: ['Review', 'Low Priority'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['qa_tools_review.pdf'],
                            comments: ['Review the tools used for QA', 'Identify areas where improvements can be made'],
                            cover: 'cover_qa_tools.png',
                            dueDate: '2024-10-05',
                        },
                        {
                            id: 'c140',
                            title: 'Finalize QA processes',
                            labels: ['Important', 'Completed'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['qa_final_processes.pdf'],
                            comments: ['Finalize all QA processes before launch', 'Ensure everything is documented and ready'],
                            cover: 'cover_final_qa_processes.png',
                            dueDate: '2024-10-10',
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g105',
                    title: 'Launch Preparation',
                    archivedAt: null,
                    tasks: [
                        {
                            id: 'c141',
                            title: 'Create launch checklists',
                            labels: ['Urgent', 'In Progress'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['launch_checklists_v1.pdf'],
                            comments: ['Develop a comprehensive checklists for the launch', 'Include all critical tasks'],
                            cover: 'cover_launch_checklists.png',
                            dueDate: '2024-09-01',
                        },
                        {
                            id: 'c142',
                            title: 'Coordinate with marketing',
                            labels: ['Review', 'Important'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['marketing_coordination_plan.pdf'],
                            comments: ['Work closely with the marketing team to plan the launch', 'Ensure all promotional materials are ready'],
                            cover: 'cover_marketing_coordination.png',
                            dueDate: '2024-09-05',
                        },
                        {
                            id: 'c143',
                            title: 'Prepare launch communication',
                            labels: ['Completed', 'Important'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['launch_communication_plan.pdf'],
                            comments: ['Prepare communication materials for the launch', 'Ensure clear and concise messaging'],
                            cover: 'cover_launch_communication.png',
                            dueDate: '2024-09-10',
                        },
                        {
                            id: 'c144',
                            title: 'Set up launch events',
                            labels: ['Review', 'On Hold'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['launch_events_setup_plan.pdf'],
                            comments: ['Plan and set up any events related to the launch', 'Coordinate with event planners if necessary'],
                            cover: 'cover_launch_events.png',
                            dueDate: '2024-09-15',
                        },
                        {
                            id: 'c145',
                            title: 'Prepare user guides',
                            labels: ['Important', 'Completed'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['user_guides_v1.pdf'],
                            comments: ['Create user guides and documentation', 'Ensure they are clear and easy to follow'],
                            cover: 'cover_user_guides.png',
                            dueDate: '2024-09-20',
                        },
                        {
                            id: 'c146',
                            title: 'Plan launch support',
                            labels: ['Review', 'Low Priority'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['launch_support_plan.pdf'],
                            comments: ['Plan how to provide support during and after the launch', 'Ensure adequate resources are available'],
                            cover: 'cover_launch_support.png',
                            dueDate: '2024-09-25',
                        },
                        {
                            id: 'c147',
                            title: 'Conduct launch rehearsals',
                            labels: ['In Progress', 'Review'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['launch_rehearsals_plan.pdf'],
                            comments: ['Conduct rehearsals for the launch day', 'Ensure everything goes smoothly'],
                            cover: 'cover_launch_rehearsals.png',
                            dueDate: '2024-09-30',
                        },
                        {
                            id: 'c148',
                            title: 'Finalize launch plan',
                            labels: ['Important', 'On Hold'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['final_launch_plan_v1.pdf'],
                            comments: ['Finalize all details of the launch plan', 'Ensure everyone is aligned and ready'],
                            cover: 'cover_final_launch_plan.png',
                            dueDate: '2024-10-01',
                        },
                        {
                            id: 'c149',
                            title: 'Launch day monitoring',
                            labels: ['Review', 'Completed'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['launch_day_monitoring_plan.pdf'],
                            comments: ['Monitor the launch closely on the day', 'Respond quickly to any issues that arise'],
                            cover: 'cover_launch_monitoring.png',
                            dueDate: '2024-10-05',
                        },
                        {
                            id: 'c150',
                            title: 'Post-launch analysis',
                            labels: ['Important', 'Urgent'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['post_launch_analysis_report.pdf'],
                            comments: ['Conduct a post-launch analysis', 'Identify successes and areas for improvement'],
                            cover: 'cover_post_launch_analysis.png',
                            dueDate: '2024-10-10',
                        },
                    ],
                    style: {},
                },
                {
                    id: 'g106',
                    title: 'Post-Launch Support',
                    archivedAt: null,
                    tasks: [
                        {
                            id: 'c151',
                            title: 'Monitor user feedback',
                            labels: ['Important', 'Review'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['user_feedback_report_v1.pdf'],
                            comments: ['Collect and monitor user feedback', 'Identify any common issues or requests'],
                            cover: 'cover_user_feedback.png',
                            dueDate: '2024-09-01',
                        },
                        {
                            id: 'c152',
                            title: 'Provide technical support',
                            labels: ['Urgent', 'In Progress'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['technical_support_guide_v1.pdf'],
                            comments: ['Provide technical support for any issues post-launch', 'Ensure quick resolution of critical problems'],
                            cover: 'cover_technical_support.png',
                            dueDate: '2024-09-05',
                        },
                        {
                            id: 'c153',
                            title: 'Release updates',
                            labels: ['Review', 'On Hold'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['update_release_plan_v1.pdf'],
                            comments: ['Plan and release updates based on user feedback and bug reports', 'Prioritize important updates'],
                            cover: 'cover_release_updates.png',
                            dueDate: '2024-09-10',
                        },
                        {
                            id: 'c154',
                            title: 'Conduct training sessions',
                            labels: ['Important', 'Completed'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['training_sessions_plan_v1.pdf'],
                            comments: ['Conduct training sessions for new users', 'Ensure they understand how to use the app effectively'],
                            cover: 'cover_training_sessions.png',
                            dueDate: '2024-09-15',
                        },
                        {
                            id: 'c155',
                            title: 'Monitor app performance',
                            labels: ['Review', 'Important'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['app_performance_report_v1.pdf'],
                            comments: ['Continuously monitor app performance', 'Identify and resolve any performance issues'],
                            cover: 'cover_app_performance.png',
                            dueDate: '2024-09-20',
                        },
                        {
                            id: 'c156',
                            title: 'Address user issues',
                            labels: ['Urgent', 'In Progress'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['user_issues_report_v1.pdf'],
                            comments: ['Address any issues reported by users', 'Ensure timely resolution to maintain user satisfaction'],
                            cover: 'cover_user_issues.png',
                            dueDate: '2024-09-25',
                        },
                        {
                            id: 'c157',
                            title: 'Evaluate support effectiveness',
                            labels: ['Review', 'Completed'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['support_effectiveness_report_v1.pdf'],
                            comments: ['Evaluate the effectiveness of the support provided post-launch', 'Identify areas for improvement'],
                            cover: 'cover_support_effectiveness.png',
                            dueDate: '2024-09-30',
                        },
                        {
                            id: 'c158',
                            title: 'Plan future updates',
                            labels: ['Important', 'On Hold'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['future_updates_plan_v1.pdf'],
                            comments: ['Plan future updates and new features', 'Incorporate user feedback and industry trends'],
                            cover: 'cover_future_updates.png',
                            dueDate: '2024-10-01',
                        },
                        {
                            id: 'c159',
                            title: 'Conduct post-launch review',
                            labels: ['Review', 'Low Priority'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['post_launch_review_report_v1.pdf'],
                            comments: ['Conduct a review of the post-launch phase', 'Document lessons learned for future projects'],
                            cover: 'cover_post_launch_review.png',
                            dueDate: '2024-10-05',
                        },
                        {
                            id: 'c160',
                            title: 'Transition to maintenance phase',
                            labels: ['Important', 'Completed'],
                            description: '',
                            checklists: [],
                            members: [{fullname:'John Doe', color:getRandomColor()}, {fullname:'Jane Smith',color:getRandomColor()}],
                            attachments: ['maintenance_phase_plan_v1.pdf'],
                            comments: ['Transition the app from post-launch support to regular maintenance', 'Ensure a smooth handover'],
                            cover: 'cover_transition_to_maintenance.png',
                            dueDate: '2024-10-10',
                        },
                    ],
                    style: {},
                },
            ],
            activities: [
                {
                    id: 'a101',
                    title: 'Changed Color',
                    createdAt: 154514,
                    byMember: {
                        id: 'u101',
                        fullname: 'Abi Abambi',
                        imgUrl: 'http://some-img',
                    },
                    group: {
                        id: 'g101',
                        title: 'Urgent Stuff',
                    },
                    task: {
                        id: 'c101',
                        title: 'Replace Logo',
                    },
                },
            ],
        }

        await storageService.post(STORAGE_KEY, boards)
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
    console.log('boards:', boards)

    return boards
}

function getById(boardId) {
    return storageService.get(STORAGE_KEY, boardId)
}

async function remove(boardId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, boardId)
}

async function save(board) {
    var savedBoard
    if (board._id) {
        savedBoard = await storageService.put(STORAGE_KEY, board)
    } else {
        savedBoard = await storageService.post(STORAGE_KEY, board)
    }
    return savedBoard
}

async function addBoardMsg(boardId, txt) {
    // Later, this is all done by the backend
    const board = await getById(boardId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt,
    }
    board.msgs.push(msg)
    await storageService.put(STORAGE_KEY, board)

    return msg
}

function updateBoard(board, groupId, taskId, { key, value }, activity = '') {
    const gIdx = board.groups?.findIndex(group => group.id === groupId)
    const tIdx = board.groups[gIdx]?.tasks.findIndex(task => task.id === taskId)
    // console.log('gIdx:', gIdx)
    // console.log('tIdx:', tIdx)

    if (tIdx >= 0) {
        // board.groups[gIdx].tasks[tIdx][key] = value
        if (key === 'deleteTask') {
            // Remove the task from the tasks array
            board.groups[gIdx].tasks.splice(tIdx, 1);
        }else if (key === 'checklists') {
            console.log(value)
            board.groups[gIdx].tasks[tIdx].checklists = value;
        }
        else {
            board.groups[gIdx].tasks[tIdx][key] = value
        }
         
    } else if (gIdx >= 0 && tIdx < 0) {
        if (key === 'deleteGroup') {
            board.groups.splice(gIdx, 1)
        }
        else {
            board.groups[gIdx][key] = value
        }
    } else {
        board[key] = value
        console.log('mama:', board.groups[gIdx].tasks[tIdx][key])
    }

    if (activity) {
        activity = addActivity(activity)
    }

    save(board)
    return board
    // Code to update the board
}

function addActivity(txt) {
    return (activity = {
        id: utilService.makeId(),
        txt,
        createdAt: Date.now(),
        byMember: {
            _id: 'u101',
            fullname: 'Abi Abambi',
            imgUrl: 'http://some-img',
        },
        type: 'add-task',
    })
}

function getEmptyGroup() {
    return {
        id: makeId(),
        title: '',
        tasks: [{ id: makeId(), title: '', labels: [], members: [], attachments: [], comments: [], cover: '', dueDate: '' }],
        style: {},
    }
}

function getEmptyItem() {
    return {
        id: makeId(),
        text: '',
        isChecked: false
    }
}

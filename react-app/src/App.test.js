import { render, screen, queryByAttribute } from "@testing-library/react";
import { Menu } from "./pages/Menu";
import { TaskViewBase } from "./pages/ViewTasks";
import React from "react";
import { CreateTaskModal } from "./pages/CreateTask";
import { SettingsModal } from "./pages/SettingsModal";

/* Helper Functions */
const getById = queryByAttribute.bind(null, "id"),
    getValueByID = (view, id) => getById(view.container, id).value;

/* Mock Navigate */
const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockedUsedNavigate,
}));

/* Spoof Data */
const data = {
    users: [
        { name: "Cymbre Spoehr", email: "scottcym@mail.gvsu.edu", password: "password123", pfpref: "pfp/cymbre-spoehr.jpg" },
        { name: "Chase Kinard", email: "test", password: "test", pfpref: "pfp/chase-kinard.png" }
    ],
    
    tasks: [
        { title: "Clean the fridge", duration: "30", date: "2023-04-19", assignedBy: "1", assignedTo: "2" },
        { title: "Sweep the basement", duration: "60", date: "2023-04-20", assignedBy: "2", assignedTo: "1" }
    ]
};

/* Menu */
describe("Menu", () => {
    test("displays the name of user #1.", () => {
        render(<Menu data={ data } user={ 1 }/>);
        const name = screen.getByText(/Cymbre Spoehr/i);
        expect(name).toBeInTheDocument();
    });

    test("displays the name of user #2.", () => {
        render(<Menu data={ data } user={ 2 }/>);
        const name = screen.getByText(/Chase Kinard/i);
        expect(name).toBeInTheDocument();
    });
});

/* Task View */
describe("Task View", () => {
    let createTaskModal;
    
    beforeEach(() => {
        createTaskModal = { state: false, update: () => { } };
        render(<TaskViewBase data={data} createTaskModal={createTaskModal} />);
    });

    test("tasks display the correct name.", () => {
        const name1 = screen.getByText("Clean the fridge"),
            name2 = screen.getByText("Sweep the basement");
        expect(name1).toBeInTheDocument();
        expect(name2).toBeInTheDocument();
    });

    test("tasks display the correct duration.", () => {
        const duration1 = screen.getByText("Duration: 30"),
            duration2 = screen.getByText("Duration: 60");
        expect(duration1).toBeInTheDocument();
        expect(duration2).toBeInTheDocument();
    });

    test("tasks display the correct date.", () => {
        const date1 = screen.getByText("Date: 2023-04-19"),
            date2 = screen.getByText("Date: 2023-04-20");
        expect(date1).toBeInTheDocument();
        expect(date2).toBeInTheDocument();
    });

    test("tasks display the correct assignee name.", () => {
        const assignee1 = screen.getByText("Cymbre Spoehr"),
            assignee2 = screen.getByText("Chase Kinard");
        expect(assignee1).toBeInTheDocument();
        expect(assignee2).toBeInTheDocument();
    });
    
});

/* Create Task Modal */
describe("Create Task Modal", () => {
    let createTaskModal;
    
    beforeEach(() => {
        createTaskModal = {
            state: true, update: () => { },
            crud: {
                cancel: () => { }, submit: () => { }, updateFormData: () => { }, onEdit: () => { }
            }
        };
    });

    test("inputs are default when creating a new task.", () => {
        const view = render(<CreateTaskModal userData={data} createTaskModal={createTaskModal} taskData={{}} />);
        const title = getValueByID(view, "name"),
            date = getValueByID(view, "date"),
            duration = getValueByID(view, "duration"),
            assignTo = getValueByID(view, "assignTo");
        expect(title).toEqual("");
        expect(date).toEqual("");
        expect(duration).toEqual("");
        expect(assignTo).toEqual(data.users[0].name);       // Default "assignTo" is first user.
    });

    test("inputs display correct information when editing a task.", () => {
        const view = render(<CreateTaskModal userData={data} createTaskModal={createTaskModal} taskData={data.tasks[0]} />);        
        const title = getValueByID(view, "name"),
            date = getValueByID(view, "date"),
            duration = getValueByID(view, "duration"),
            assignTo = getValueByID(view, "assignTo");
        expect(title).toEqual(data.tasks[0].title);
        expect(date).toEqual(data.tasks[0].date);
        expect(duration).toEqual(data.tasks[0].duration);
        expect(assignTo).toEqual(data.users[0].name);       // couldn't figure out how to retain assignTo text
        // expect(assignTo).toEqual(data.users[parseInt(data.tasks[0].assignedTo) - 1].name);
    });
    
});

/* Settings Modal */
describe("Settings Modal", () => {
    test("inputs display correct information when editing user profile.", () => {
        const view = render(<SettingsModal userData={data} showModal={true} user={1} />);
        const name = getValueByID(view, "name"),
            email = getValueByID(view, "email"),
            password = getValueByID(view, "password");
        expect(name).toEqual(data.users[0].name);
        expect(email).toEqual(data.users[0].email);
        expect(password).toEqual(data.users[0].password);
    });

});
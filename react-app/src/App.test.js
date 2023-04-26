import { render, screen, queryByAttribute } from '@testing-library/react';
// import App from './App';
import { Menu } from './pages/Menu';
import { TaskViewBase } from './pages/ViewTasks';
import React from 'react';
import { CreateTaskModal } from './pages/CreateTask';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const data = {
  users: [
    {name: "Cymbre Spoehr", password: "password123", pfpref: "pfp/cymbre-spoehr.jpg"},
    {name: "Chase Kinard", password: "password123", pfpref: "pfp/chase-kinard.png"}
  ],

  tasks: [
    {title: "Clean the fridge", duration: 30, date: "2023-04-19", assignedBy: 1, assignedTo: 2},
    {title: "Sweep the basement", duration: 60, date: "2023-04-20", assignedBy: 1, assignedTo: 2}
  ]
}

// Test that the correct username gets displayed
test('displays name of user', () => {
  render(<Menu data={data} user={1}/>);
  const linkElement = screen.getByText(/Cymbre Spoehr/i);
  expect(linkElement).toBeInTheDocument();
});

test('displays name of user 2', () => {
  render(<Menu data={data} user={2}/>);
  const linkElement = screen.getByText(/Chase Kinard/i);
  expect(linkElement).toBeInTheDocument();
});

test('displays the correct task name', () => {
  const createTaskModal = { state: false, update: () => {}}
  render(<TaskViewBase data={data} createTaskModal={createTaskModal} />);
  let linkElement = screen.getByText("Clean the fridge");
  expect(linkElement).toBeInTheDocument();

  linkElement = screen.getByText("Sweep the basement");
  expect(linkElement).toBeInTheDocument();
});

test('displays the correct task duration', () => {
  const createTaskModal = { state: false, update: () => {}}
  render(<TaskViewBase data={data} createTaskModal={createTaskModal} />);
  let linkElement = screen.getByText("Duration: 30");
  expect(linkElement).toBeInTheDocument();

  linkElement = screen.getByText("Duration: 60");
  expect(linkElement).toBeInTheDocument();
})

test('displays the correct task date', () => {
  const createTaskModal = { state: false, update: () => {}}
  render(<TaskViewBase data={data} createTaskModal={createTaskModal} />);
  let linkElement = screen.getByText("Date: 2023-04-19");
  expect(linkElement).toBeInTheDocument();

  linkElement = screen.getByText("Date: 2023-04-20");
  expect(linkElement).toBeInTheDocument();
})

test('displays blank information in create task', () => {
  const createTaskModal = { state: true, update: () => {}, crud: {cancel: () => {}, submit: () => {}, updateFormData: () => {}, onEdit: () => {}}}
  const view = render(<CreateTaskModal userData={data} createTaskModal={createTaskModal} taskData={{}} />);
  const getById = queryByAttribute.bind(null, 'id');

  let title = getById(view.container, 'name').value;
  expect(title).toEqual("");

  let duration = getById(view.container, 'duration').value;
  expect(duration).toEqual("");
})

test('displays task information in edit task', () => {
  const createTaskModal = { state: true, update: () => {}, crud: {cancel: () => {}, submit: () => {}, updateFormData: () => {}, onEdit: () => {}}}
  const view = render(<CreateTaskModal userData={data} createTaskModal={createTaskModal} taskData={data.tasks[0]} />);
  const getById = queryByAttribute.bind(null, 'id');
  let title = getById(view.container, 'name').value;
  expect(title).toEqual("Clean the fridge");

  let date = getById(view.container, 'date').value;
  expect(date).toEqual("2023-04-19");

  let duration = getById(view.container, 'duration').value;
  expect(duration).toEqual("30");
})
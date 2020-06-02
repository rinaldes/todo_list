import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import { Card, Feed, Input, Form, Icon, List } from 'semantic-ui-react'

class Todolist extends React.Component {
    state = {
        tugas: [["Tugas 1", false], ["Tugas 2", false], ["Tugas 3", false]]
    };

    deleteTask = (index) => {
        const newData = [...this.state.tugas];
        newData.splice(index, 1);
        this.setState({ tugas: newData });
    }

    doneTask = (index) => {
        const newData = [...this.state.tugas];
        const complete = [newData[index][0], true];
        newData[index] = complete
        this.setState({ tugas: [...newData] });
    }

    newTask = task => {
        this.setState({ tugas: [...this.state.tugas, [task, false]] });
    }

    render() {
        return (
            <Card grid centered middle>
                <Card.Content>
                    <Header jumlahTugas={this.state.tugas.length} />
                </Card.Content>
                <Card.Content>
                    <Feed>
                        <TaskList tugas={this.state.tugas} onDelete={this.deleteTask} onDone={this.doneTask} />
                    </Feed>
                </Card.Content>
                <Card.Content>
                    <AddTask onFormSubmit={this.newTask} />
                </Card.Content>
            </Card>
        );
    }
}

class AddTask extends React.Component {
    state = { term: "" };

    submitTask = (e) => {
        e.preventDefault();
        if (this.state.term === "") return;
        this.props.onFormSubmit(this.state.term);
        this.setState({ term: "" });
    }

    render() {
        return (
            <Form onSubmit={this.submitTask}>
                <Input
                    icon="plus"
                    type="text"
                    className="input"
                    placeholder="Tambahkan Tugas"
                    value={this.state.term}
                    onChange={(e) => this.setState({ term: e.target.value })}
                    fluid
                />
            </Form>
        );
    }
}

function Header(props) {
    return (
        <Card.Header>Sisa {props.jumlahTugas} Tugas</Card.Header>
    )
}

function TaskList(props) {
    const daftarTugas = props.tugas.map((todo, index) => {
        return <Todo content={todo} key={index} id={index} selesai={todo[1]} onDelete={props.onDelete} onDone={props.onDone} />
    });

    return (
        <Feed.Event>
            <Feed.Content>
                {daftarTugas}
            </Feed.Content>
        </Feed.Event>
    );
}

function Todo(props) {
    return (
        <List>
            <List.Item>
                <label className={props.selesai ? "done" : null}>{props.content}</label>
                <Icon
                    color='red'
                    name="trash alternate outline"
                    onClick={() => { props.onDelete(props.id) }}
                />
                <Icon
                    color='blue'
                    className={props.selesai ? "hilang" : null}
                    name="check"
                    onClick={() => { props.onDone(props.id) }}
                />
            </List.Item>
        </List>
    );
}

ReactDOM.render(
    <Todolist />,
    document.getElementById('root')
);
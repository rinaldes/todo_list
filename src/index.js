import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css'
import { Card, Feed, Input, Form, Icon, List } from 'semantic-ui-react'

class Todolist extends React.Component {
    state = {
        tugas: ["Tugas 1", "Tugas 2", "Tugas 3"]
    };

    deleteTask = (index) => {
        const newArr = [...this.state.tugas];
        newArr.splice(index, 1);
        this.setState({ tugas: newArr });
    }

    newTask = task => {
        this.setState({ tugas: [...this.state.tugas, task] });
    }

    render() {
        return (
            <Card grid centered middle>
                <Card.Content>
                    <Header jumlahTugas={this.state.tugas.length} />
                </Card.Content>
                <Card.Content>
                    <Feed>
                        <TaskList tugas={this.state.tugas} onDelete={this.deleteTask} />
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
                    icon={<Icon name='plus' inverted circular link />}
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
        return <Todo content={todo} key={index} id={index} onDelete={props.onDelete} />
    });

    return (
        <Feed.Event>
            <Feed.Content>
                <label>{daftarTugas}</label>
            </Feed.Content>
        </Feed.Event>
    );
}

function Todo(props) {
    return (
        <List>
            <List.Item>
                {props.content}
                <Icon
                    name="trash alternate outline"
                    onClick={() => { props.onDelete(props.id) }}
                />
            </List.Item>
        </List>
    );
}

ReactDOM.render(
    <Todolist />,
    document.getElementById('root')
);
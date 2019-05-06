import React, { Suspense, lazy } from 'react';
import { Spinner } from 'react-bootstrap';
import './Sandbox.css';
import 'mocha/mocha.css';

const { mocha } = window;

const MonacoEditor = lazy(() => import('react-monaco-editor'));

const SandboxPreloader = () => (
  <div className='sandbox-spinner'>
    <Spinner animation='border' variant="secondary" />
  </div>
);

export default class Sandbox extends React.Component {
  handleTestButton = () => {
    document.getElementById('mocha').innerHTML = '';
    mocha.suite.suites = [];
    this.props.testSolution();
  }

  handleCodeChange = (newValue) => {
    this.props.changeCode({ value: newValue });
  }

  handleNextButton = id => () => {
    this.props.getNextTaskId({ taskId: id + 1 });
  }

  handlePrevButton = id => () => {
    this.props.getPrevTaskId({ taskId: id - 1 });
  }

  render() {
    const {
      code,
      currentTask: {
        id,
        name,
        complexity,
        description,
      },
      firstElement,
      lastElement,
    } = this.props;
    console.log(lastElement.id);
    return (
      <div className='workspace'>
        <div className='sandbox'>
          <Suspense fallback={<SandboxPreloader />}>
            <MonacoEditor
              language='javascript'
              theme='vs-light'
              onChange={this.handleCodeChange}
              value={code}
            />
          </Suspense>
        </div>
        {/* <Button variant="primary" className="btn-sandbox" size="sm">Отправить решение</Button> */}
        <div className='interface-box'>
          <p className='exercise-name'>{name}</p>
          <p className='exercise-complexity'>Уровень: {complexity}</p>
          <div className='exercise-description'>{description}</div>
          <div className='test-output'>
            <div id='mocha' />
          </div>
          <button className="btn-sandbox" onClick={this.handleTestButton}>Проверить</button>
        </div>
        <div className="container-navigation">
          <button
            className="btn-back"
            disabled = {id === firstElement.id}
            onClick={this.handlePrevButton(id)}
          >
              Назад
          </button>
          <button
            className="btn-next"
            disabled = {id === lastElement.id}
            onClick={this.handleNextButton(id)}
          >
              Далее
          </button>
        </div>
      </div>
    );
  }
}

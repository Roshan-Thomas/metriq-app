import axios from 'axios'
import React from 'react'
import config from './../config'
import ErrorHandler from './../components/ErrorHandler'
import EditButton from '../components/EditButton'
import { Modal, Button } from 'react-bootstrap'

class Submission extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      item: {},
      showAddModal: false,
      addModalMode: '',
      showRemoveModal: false,
      removeModalMode: ''
    }

    this.handleOnClickAdd = this.handleOnClickAdd.bind(this)
    this.handleOnClickRemove = this.handleOnClickRemove.bind(this)
    this.handleHideAddModal = this.handleHideAddModal.bind(this)
    this.handleHideRemoveModal = this.handleHideRemoveModal.bind(this)
    this.handleAddModalSubmit = this.handleAddModalSubmit.bind(this)
    this.handleRemoveModalDone = this.handleRemoveModalDone.bind(this)
  }

  handleOnClickAdd (mode) {
    this.setState({ showAddModal: true, addModalMode: mode })
  }

  handleOnClickRemove (mode) {
    this.setState({ showRemoveModal: true, removeModalMode: mode })
  }

  handleHideAddModal () {
    this.setState({ showAddModal: false })
  }

  handleHideRemoveModal () {
    this.setState({ showRemoveModal: false })
  }

  handleAddModalSubmit () {
    this.setState({ showAddModal: false })
    console.log('Add modal submitted.')
  }

  handleRemoveModalDone () {
    this.setState({ showRemoveModal: false })
    console.log('Add modal submitted.')
  }

  componentDidMount () {
    const route = config.api.getUriPrefix() + '/submission/' + this.props.match.params.id
    axios.get(route)
      .then(res => {
        this.setState({ isRequestFailed: false, requestFailedMessage: '', item: res.data.data })
      })
      .catch(err => {
        this.setState({ isRequestFailed: true, requestFailedMessage: ErrorHandler(err) })
      })
  }

  render () {
    return (
      <div className='container submission-detail-container'>
        <header>{this.state.item.name}</header>
        <br />
        <div className='row'>
          <div className='col-md-12'>
            <div><h1>{this.state.item.submissionName}</h1></div>
            <div className='submission-description'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec commodo est. Nunc mollis nunc ac ante vestibulum, eu consectetur magna porttitor. Proin ac tortor urna. Aliquam ac ante eu nunc aliquam convallis et in sem. Donec volutpat tincidunt tincidunt. Aliquam at risus non diam imperdiet vestibulum eget a orci. In ultricies, arcu vel semper lobortis, lorem orci placerat nisi, id fermentum purus odio ut nulla. Duis quis felis a erat mattis venenatis id sit amet purus. Aenean a risus dui.
            </div>
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-md-6'>
            <div>
              <h2>Tasks
                <EditButton
                  className='float-right edit-button btn'
                  onClickAdd={() => this.handleOnClickAdd('tasks')}
                  onClickRemove={() => this.handleOnClickRemove('tasks')}
                />
              </h2><hr />
            </div>
            <div>Lorem ipsum</div>
          </div>
          <div className='col-md-6'>
            <div>
              <h2>Methods
                <EditButton
                  className='float-right edit-button btn'
                  onClickAdd={() => this.handleOnClickAdd('methods')}
                  onClickRemove={() => this.handleOnClickRemove('methods')}
                />
              </h2><hr />
            </div>
            <div>Lorem ipsum</div>
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-md-12'>
            <div>
              <h2>Results
                <EditButton
                  className='float-right edit-button btn'
                  onClickAdd={() => this.handleOnClickAdd('results')}
                  onClickRemove={() => this.handleOnClickRemove('results')}
                />
              </h2><hr />
            </div>
            <div>Lorem ipsum</div>
          </div>
        </div>
        <Modal show={this.state.showAddModal} onHide={this.handleHideAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!<br /><br />Mode: {this.state.addModalMode}</Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={this.handleAddModalSubmit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.showRemoveModal} onHide={this.handleHideRemoveModal}>
          <Modal.Header closeButton>
            <Modal.Title>Remove</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!<br /><br />Mode: {this.state.removeModalMode}</Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={this.handleRemoveModalDone}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default Submission

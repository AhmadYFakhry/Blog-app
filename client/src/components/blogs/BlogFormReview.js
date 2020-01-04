// BlogFormReview shows users their form inputs for review
import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import formFields from 'components/blogs/formFields'
import { submitBlog } from 'actions'

class BlogFormReview extends Component {

  state = { file: null }

  renderFields() {
    const { formValues } = this.props
    return _.map(formFields, ({ name, label }) => (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    ))
  }

  renderButtons() {
    const { onCancel } = this.props
    return (
      <div>
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button className="green btn-flat right white-text">
          Save Blog
          <i className="material-icons right">email</i>
        </button>
      </div>
    )
  }

  onSubmit(e) {
    e.preventDefault()
    const { dispatch, history, formValues } = this.props
    console.log("onSubmit");
    console.log(this.state);
    dispatch(submitBlog(formValues, this.state.file, history));
  }

  onFileChange(e) {
    this.setState({ file: e.target.files });
    console.log(e.target.files)
  }

  render() {
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <h5>Please confirm your entries</h5>
        {this.renderFields()}
        <h5>Add An Image</h5>
        <input onChange={
          this.onFileChange.bind(this)
        } type="file" accept="image/*" />
        {this.renderButtons()}
      </form>
    )
  }
}

const mapStateToProps = state => ({ formValues: state.form.blogForm.values })

export default connect(mapStateToProps)(withRouter(BlogFormReview))

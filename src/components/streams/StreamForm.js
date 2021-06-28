import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError = ({ touched, error }) => {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  };
  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.touched && meta.error ? "error" : ""} `;
    return (
      <div className={className}>
        <label>{label}</label>
        <input
          // onChange={formProps.input.onChange}
          // value={formProps.input.value}
          {...input}
          autoComplete="off"
        />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  };
  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />

        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}
const validate = (formsValue) => {
  const errors = {};
  if (!formsValue.title) {
    errors.title = "You must enter a title";
  }
  if (!formsValue.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};
export default reduxForm({
  form: "streamForm",
  validate: validate,
})(StreamForm);

import React from 'react';
import { Form, Alert, Button } from 'react-bootstrap';

import './styles.css';

const GenericForm = props => {
  const { entity, handleSubmitForm, handleChange, fields } = props;
  const { error } = entity;

  const fieldsGenerator = {
    text: field => (
      <Form.Group key={`${field.name}-group`}>
        <Form.Label key={`${field.name}-label`}>{field.label}</Form.Label>
        <Form.Control
          key={`${field.name}-control`}
          type={field.type}
          name={field.name}
          onChange={event => handleChange(event)}
          value={entity[field.name]}
          required
        />
        {error[field.name] && (
          <Form.Text key={`${field.name}-text`} className="text-muted error">
            {error[field.name]}
          </Form.Text>
        )}
      </Form.Group>
    ),
    select: field => (
      <Form.Group key={`${field.name}-group`}>
        <Form.Label key={`${field.name}-label`}>{field.label}</Form.Label>
        <Form.Control
          key={`${field.name}-control`}
          as="select"
          name={field.name}
          onChange={event => this.handleChange(event)}
          value={entity[field.name]}
          required
        >
          {field.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Control>
        {error[field.name] && (
          <Form.Text key={`${field.name}-text`} className="text-muted error">
            {error[field.name]}
          </Form.Text>
        )}
      </Form.Group>
    ),
    file: field => (
      <Form.File
        key={`${field.name}-file`}
        id="file-upload"
        label="Upload file"
        custom
      />
    ),
  };

  return (
    <div>
      {error.non_field_errors && (
        <Alert variant="danger">{error.non_field_errors}</Alert>
      )}
      <div className="form-wrapper">
        <div className="form-inner">
          <Form onSubmit={event => handleSubmitForm(event)}>
            <h3>{!entity.id ? 'Add new' : 'Edit'}</h3>
            {fields.map(field => fieldsGenerator[field.type](field))}
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default GenericForm;

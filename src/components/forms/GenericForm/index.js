import React from 'react';
import { Form, Alert, Button } from 'react-bootstrap';

import './styles.css';

const GenericForm = props => {
  const { entity, handleSubmitForm, handleChange, fields } = props;
  const { error } = entity;

  const fieldsGenerator = field => {
    if (['text', 'email', 'password', 'file'].includes(field.type)) {
      return (
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
      );
    } else if (['select'].includes(field.type)) {
      return (
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
      );
    }
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
            {fields.map(field => fieldsGenerator(field))}
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

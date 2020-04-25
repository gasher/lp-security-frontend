import React from 'react';
import { Form, Alert, Button } from 'react-bootstrap';

import './styles.css';

const GenericForm = props => {
  const { entity, handleSubmitForm, handleChange, fields } = props;
  const { error } = entity;

  return (
    <div>
      {error.non_field_errors && (
        <Alert variant="danger">{error.non_field_errors}</Alert>
      )}
      <div className="form-wrapper">
        <div className="form-inner">
          <Form onSubmit={event => handleSubmitForm(event)}>
            <h3>{!entity.id ? 'Add new' : 'Edit'}</h3>
            {fields.map(
              field =>
                field.type !== 'select' ? (
                  <Form.Group key={`${field.name}-group`}>
                    <Form.Label key={`${field.name}-label`}>
                      {field.label}
                    </Form.Label>
                    <Form.Control
                      key={`${field.name}-control`}
                      type={field.type}
                      name={field.name}
                      onChange={event => handleChange(event)}
                      value={entity[field.name]}
                      required
                    />
                    {error[field.name] && (
                      <Form.Text
                        key={`${field.name}-text`}
                        className="text-muted error"
                      >
                        {error[field.name]}
                      </Form.Text>
                    )}
                  </Form.Group>
                ) : (
                  <Form.Group key={`${field.name}-group`}>
                    <Form.Label key={`${field.name}-label`}>
                      {field.label}
                    </Form.Label>
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
                      <Form.Text
                        key={`${field.name}-text`}
                        className="text-muted error"
                      >
                        {error[field.name]}
                      </Form.Text>
                    )}
                  </Form.Group>
                )
            )}
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

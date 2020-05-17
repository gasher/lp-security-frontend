import React, { Component } from 'react';
import { Row } from 'react-bootstrap';

import Config from '../../../components/entities/Config';
import EntityList from '../../../components/lists/EntityList';
import { withStore } from '../../../components/helpers';
import ConfigForm from '../../forms/ConfigForm';

class ConfigList extends Component {
  state = {
    configs: [],
  };

  async componentDidMount() {
    const {
      store: { configStore },
    } = this.props;
    const configs = await configStore.getAll();

    return this.setState({
      configs,
    });
  }

  mapScriptsToComponents() {
    return (
      <Row>
        {this.state.configs.map(config => (
          <Config key={config.id} ConfigForm={ConfigForm} {...config} />
        ))}
      </Row>
    );
  }

  render() {
    return (
      <EntityList
        entities={this.mapScriptsToComponents()}
        addHref="/config-form"
      />
    );
  }
}

export default withStore(ConfigList);

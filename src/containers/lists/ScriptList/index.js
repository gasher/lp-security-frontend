import React, { Component } from 'react';

import Script from '../../../components/entities/Script';
import EntityList from '../../../components/lists/EntityList';
import { withStore } from '../../../components/helpers';

class ScriptList extends Component {
  state = {
    scripts: [],
  };

  async componentDidMount() {
    const {
      store: { scriptStore },
    } = this.props;
    const scripts = await scriptStore.getAll();

    return this.setState({
      scripts,
    });
  }

  mapScriptsToComponents() {
    return this.state.scripts.map(script => (
      <Script key={script.id} {...script} />
    ));
  }

  render() {
    return (
      <EntityList
        entities={this.mapScriptsToComponents()}
        addHref="/script-form"
      />
    );
  }
}

export default withStore(ScriptList);

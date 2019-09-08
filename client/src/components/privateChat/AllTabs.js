import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return ( <Typography component="div" style={{ padding: 8 * 3 }}>{props.children}</Typography> );
 }

TabContainer.propTypes = { children: PropTypes.node.isRequired };

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

export default class AllTabs extends Component {
  constructor(props) {
    super(props)
    this.state = {
        value: "0"
    }
}

handleChange = (event, value) => { this.setState({ value }) };

  render() {
    return (
      <div className = "profile-sections">
      <Paper /*className = { classes.root }*/>
        <Tabs value = { this.state.value } onChange = { this.handleChange }
          indicatorColor = "secondary"
          textColor = "secondary"
          centered > 
          <Tab value = "0" label = "Tab 0" />
          <Tab value = "1" label = "Tab 1" />
          <Tab value = "2" label = "Tab 2" />
        </Tabs>
      </Paper >
      {this.state.value === "0" && <TabContainer>
        <section >
          <p>Section 0</p>
        </section>
      </TabContainer>}
      { this.state.value === "1" && <TabContainer> <p>Section 1</p></TabContainer> }
      { this.state.value === "2" && <TabContainer> <p>Section 2</p></TabContainer> }
    </div>
    )
  }
}

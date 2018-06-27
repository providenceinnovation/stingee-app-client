import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import { fetchSearch } from 'redux/modules/codeSearch.js';
import Header from 'components/Header/Header';
import styles from './reason.less';

@connect(({ codeSearch }) => ({ codeSearch }))
export default class Reason extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
  }

  search = (event) => {
    const { dispatch = {}, codeSearch } = this.props;
    let searchText = event.target.value;
    let outputField = document.getElementsByClassName('search__results')[0];

    // // outputField.innerHTML = searchText;
    dispatch(fetchSearch({ searchText, zip: "12345" }));
  };

  renderCard = () => {

  }

  render() {
    const { codeSearch: { data: codeSearch = []  } }  = this.props;

    return (
      <div>
        <Header title="Stingee" />
        <div className={styles.content}>
          <Grid>
            <Grid item xs={12} align="center">
              <Grid item xs={12} md={10} lg={8} xl={6} align="left">
                <h3>Reason for visit</h3>
              </Grid>
            </Grid>
            <Grid item xs={12} align="center">
              <Grid item xs={12} md={10} lg={8} xl={6} align="left">
                <Input onChange={this.search} />
              </Grid>
            </Grid>
            <Grid item xs={12} align="center">
              <Grid item xs={12} md={10} lg={8} xl={6} align="left">

                <Card>
                  <CardContent className="search__results">
                    { codeSearch.length > 0 && <div>Your estimated cost is </div> }
                    {
                      codeSearch.map(item => (
                        <div>
                          <b>${item.cost}</b> for <b>{item.description}</b>
                          <Divider/>
                        </div>
                      ))
                    }
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

Reason.propTypes = {
  codeSearch: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
    }))
  }),
}

Reason.defaultProps = {
  codeSearch: {
    data: [],
  },
}
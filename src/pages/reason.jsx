import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Input from '@material-ui/core/Input';

import { fetchSearch } from 'redux/modules/codeSearch';
import Header from 'components/Header/Header';
import styles from './reason.less';

@connect(({ codeSearch }) => ({ codeSearch }))
export default class Reason extends Component {
  search = ({ target: { value: searchText = '' } = {} } = {}) => {
    const { dispatch = {} } = this.props;
    dispatch(fetchSearch({ searchText, zip: "12345" }));
  };

  render() {
    const { codeSearch: { data: codeSearch = []  } }  = this.props;

    return (
      <div>
        <Header title="Stingee" />
        <div className={styles.content}>
          <Grid container spacing={16} noWrap>
            <Grid item xs={12} align="center">
              <Grid item xs={12} md={10} lg={8} xl={6} align="left">
                <h3>Reason for visit</h3>
                <Card>
                  <CardContent>
                    <Input className={styles.search} placeholder="Enter your search term (e.g. Rabies)" onChange={this.search} fullWidth />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            { codeSearch.length > 0 && (
              <Grid item xs={12} align="center">
                <Grid item xs={12} md={10} lg={8} xl={6} align="left">
                  <Card>
                    <CardContent className="search__results">
                      <div>Your estimated cost is:</div>
                      {
                        codeSearch.map(item => (
                          <div>
                            <b>${item.cost}</b> for <b>{item.description}</b>
                          </div>
                        ))
                      }
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            )}
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

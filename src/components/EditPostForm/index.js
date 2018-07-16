// @flow
import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';

import { fetchSinglePost } from '../../actions/singlePost';

type Props = {
  classes: Object,
  post: Object,
  match: Object,
  initialize: Function,
  handleSubmit: Function,
  pristine: boolean,
  submitting: boolean,
  loading: boolean,
  onSubmit: Function,
  onDelete: Function,
};

const styles = theme => ({
  container: {
    // display: 'flex',
    // flexWrap: 'wrap',
    position: 'relative',
    padding: 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%',
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  button: {
    margin: 10,
  },
  title: {
    marginLeft: 20,
    paddingTop: 20,
  },
  deleteButton: {
    marginRight: 20,
    paddingTop: 20,
    textAlign: 'right',
  },
});

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = {
      message: 'You need to provide Title',
    };
  }
  if (!values.body) {
    errors.body = {
      message: 'You need to provide a Body Content',
    };
  }
  if (!values.userId) {
    errors.userId = {
      message: 'You need to provide an userId',
    };
  }
  return errors;
};

class EditPostForm extends React.Component<Props> {
  componentWillReceiveProps(nextProps) { // Receive Post data Asynchronously
    const { post } = nextProps;
    if (post.id !== this.props.post.id) { // Initialize form only once
      this.props.initialize(post);
    }
  }

  renderField = ({ className, disabled, input, label, multiline, rows, type, meta: { touched, error } }) => (
    <React.Fragment>
      <FormControl className={className} error={touched && error && true} disabled={disabled}>
        <InputLabel htmlFor={label}>
          {label}
        </InputLabel>
        <Input {...input} id={label} type={type} multiline={multiline} rows={rows} />
        {touched && error && (
        <FormHelperText>
          {error.message}
        </FormHelperText>
        )}
      </FormControl>
    </React.Fragment>
  )

  render() {
    const { handleSubmit, pristine, submitting, classes, loading, post, onDelete } = this.props;

    return (
      <React.Fragment>
        {/* Show Delete Button only Existing Post */}
        {post.id && (
        <div className={classes.deleteButton}>
          <Button size="small" variant="contained" aria-label="Delete" disabled={submitting} onClick={onDelete}>
            <DeleteIcon />
            Delete
          </Button>
        </div>
        )}
        <h1 className={classes.title}>
          {post.id ? `Post ID: ${post.id}` : 'Add New Post'}
        </h1>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
          {loading && <CircularProgress className={classes.progress} />}
          <Grid container>
            <Field className={classes.formControl} name="userId" type="text" component={this.renderField} label="User ID" disabled />
          </Grid>
          <Grid container>
            <Field className={classes.formControl} name="title" type="text" component={this.renderField} label="Title" />
          </Grid>
          <Grid container>
            <Field className={classes.formControl} name="body" type="text" component={this.renderField} label="Body" rows="10" multiline />
          </Grid>
          <Grid container>
            <Button
              variant="contained"
              color="primary"
              disabled={pristine || submitting}
              type="submit"
              className={classes.button}
              size="large"
            >
              Save
            </Button>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.singlePostReducer.post,
});

const EditPostFormConnect = (connect(mapStateToProps, { fetchSinglePost })(reduxForm({
  form: 'post',
  validate,
})(EditPostForm)));

export default compose(
  withRouter,
  withStyles(styles),
)(EditPostFormConnect);

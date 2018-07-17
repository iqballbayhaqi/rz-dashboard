// @flow
import * as React from 'react';
import type { StatelessFunctionalComponent } from 'react';
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
import SaveIcon from '@material-ui/icons/Save';

import { fetchSingleComment } from '../../actions/singleComment';

type Props = {
  classes: Object,
  comment: Object,
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
    fontWeight: 'bold',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
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
  if (!values.name) {
    errors.name = {
      message: 'You need to provide Name',
    };
  }
  if (!values.email) {
    errors.email = { message: 'You need to provide an Email address' };
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = {
      message: 'Invalid email address',
    };
  }
  if (!values.body) {
    errors.body = {
      message: 'You need to provide a Body Content',
    };
  }
  if (!values.postId) {
    errors.userId = {
      message: 'You need to provide an Post ID',
    };
  }
  return errors;
};

class EditCommentForm extends React.Component<Props> {
  componentWillReceiveProps(nextProps) { // Receive Comment data Asynchronously
    const { comment } = nextProps;
    if (comment.id !== this.props.comment.id) { // Initialize form only once
      this.props.initialize(comment);
    }
  }

  renderField: StatelessFunctionalComponent<*> = ({
    className,
    disabled,
    input,
    label,
    multiline,
    rows,
    type,
    meta: { touched, error },
  }: Object) => (
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
    const { handleSubmit, pristine, submitting, classes, loading, comment, onDelete } = this.props;

    return (
      <React.Fragment>
        {/* Show Delete Button only on existing Comment */}
        {comment.id && (
        <div className={classes.deleteButton}>
          <Button
            size="small"
            variant="contained"
            aria-label="Delete"
            disabled={submitting}
            onClick={onDelete}
            className={classes.button}
          >
            <DeleteIcon className={classes.leftIcon} />
            Delete
          </Button>
        </div>
        )}
        <h1 className={classes.title}>
          {comment.id ? `Comment ID: ${comment.id}` : 'Add New Comment'}
        </h1>
        <form className={classes.container} noValidate autoComplete="off" onSubmit={handleSubmit}>
          {loading && <CircularProgress className={classes.progress} />}
          <Grid container>
            <Field className={classes.formControl} name="postId" type="text" component={this.renderField} label="Post ID" disabled />
          </Grid>
          <Grid container>
            <Field className={classes.formControl} name="name" type="text" component={this.renderField} label="Body" />
          </Grid>
          <Grid container>
            <Field className={classes.formControl} name="email" type="text" component={this.renderField} label="Email" />
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
              <SaveIcon className={classes.leftIcon} />
              Save
            </Button>
          </Grid>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  initialValues: state.singleCommentReducer.comment,
});

const EditCommentFormConnect = (connect(mapStateToProps, { fetchSingleComment })(reduxForm({
  form: 'comment',
  validate,
})(EditCommentForm)));

export default compose(
  withRouter,
  withStyles(styles),
)(EditCommentFormConnect);

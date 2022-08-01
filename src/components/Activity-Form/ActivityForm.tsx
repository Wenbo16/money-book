import React, { memo } from 'react';
import { isValidDate } from '../../utils/utility';
import { Item } from '../../types';
import { Field, Form } from 'formik';
import { ErrorMsg } from '../../styles/common';
interface ActivityFormProps {
  onCancelSubmit: () => void;
  item: Item | {};
  errors: any;
  touched: any;
}

// edit mode default value based on Item props, so it has to be unconotrolled form
const ActivityForm = memo(
  ({ item, onCancelSubmit, errors, touched }: ActivityFormProps) => {
    // const isItem = (value: any): value is Item => value?.id;

    return (
      <>
        <Form>
          <div className="form-group">
            <label htmlFor="activity-form-title">Title</label>
            <Field
              name="title"
              id="title"
              className="form-control"
              placeholder="请输入标题"
            />
            {touched.title && errors.title ? (
              <ErrorMsg>{errors.title}</ErrorMsg>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="activity-form-amount">Amount</label>
            <Field
              type="number"
              id="amount"
              name="amount"
              className="form-control"
              placeholder="请输入金额"
            />
            {touched.amount && errors.amount ? (
              <ErrorMsg>{errors.amount}</ErrorMsg>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="activity-form-date">Date</label>
            <Field
              type="date"
              name="date"
              className="form-control"
              placeholder="请输入日期"
            />
            {touched.date && errors.date ? (
              <ErrorMsg>{errors.date}</ErrorMsg>
            ) : null}
          </div>
          <br />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button className="btn btn-secondary" onClick={onCancelSubmit}>
            Cancel
          </button>
        </Form>
        <br />
        {/* {errMessage && (
          <div className="alert alert-danger" role="alert">
            {errMessage}
          </div>
        )} */}
      </>
    );
  }
);

export default ActivityForm;

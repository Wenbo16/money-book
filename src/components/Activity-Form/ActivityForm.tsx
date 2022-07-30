import React, { useState, useRef, memo, useEffect } from 'react';
import { isValidDate } from '../../utils/utility';
import { Item } from '../../types';

interface ActivityFormProps {
  onFormSubmit: (data: any, isEdit: boolean) => void;
  onCancelSubmit: () => void;
  item: Item | {};
}

// edit mode default value based on Item props, so it has to be unconotrolled form
const ActivityForm = memo(
  ({ item, onFormSubmit, onCancelSubmit }: ActivityFormProps) => {
    const [errMessage, setErrMessage] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [date, setDate] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
      setTitle(isItem(item) ? item?.date : '');
      setAmount(isItem(item) ? item?.amount : 0);
      setDate(isItem(item) ? item?.date : '');
    }, [item]);

    const isItem = (value: any): value is Item => value?.id;

    const submitForm = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      const editMode = !!isItem(item);
      if (amount === 0 || !date || !title) {
        setErrMessage('请输入所有必选项');
      } else {
        if (amount < 0) {
          setErrMessage('价格数字必须大于0');
        } else if (!isValidDate(date?.trim())) {
          setErrMessage('请填写正确的日期格式');
        } else {
          setErrMessage('');
          if (editMode) {
            onFormSubmit(
              {
                ...item,
                title: title?.trim(),
                amount: amount,
                date: date?.trim(),
              },
              editMode
            );
          } else {
            onFormSubmit(
              { title: title?.trim(), amount: amount, date: date },
              editMode
            );
          }
        }
      }
    };

    return (
      <div>
        <form name="activity-form">
          <div className="form-group">
            <label htmlFor="activity-form-title">Title</label>
            <input
              type="text"
              className="form-control"
              id="activity-form-title"
              name="activity-form-title"
              placeholder="请输入标题"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="activity-form-amount">Amount</label>
            <input
              type="number"
              className="form-control"
              id="activity-form-amount"
              name="activity-form-amount"
              placeholder="请输入金额"
              onChange={(e) => setAmount(Number(e.target.value))}
              value={amount}
            />
          </div>
          <div className="form-group">
            <label htmlFor="activity-form-date">Date</label>
            <input
              type="date"
              className="form-control"
              id="activity-form-date"
              name="activity-form-date"
              placeholder="请输入日期"
              onChange={(e) => setDate(e.target.value)}
              value={date}
            />
          </div>
          <br />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={submitForm}
          >
            Submit
          </button>
          <button className="btn btn-secondary" onClick={onCancelSubmit}>
            Cancel
          </button>
        </form>
        <br />
        {errMessage && (
          <div className="alert alert-danger" role="alert">
            {errMessage}
          </div>
        )}
      </div>
    );
  }
);

export default ActivityForm;

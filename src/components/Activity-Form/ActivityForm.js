import React, {useState, useRef, memo} from 'react'
import PropTypes from 'prop-types'
import { isValidDate } from '../../utility'


// edit mode default value based on Item props, so it has to be unconotrolled form
const ActivityForm = memo(({item, onFormSubmit, onCancelSubmit}) => {
    console.log('ActivityForm')
    const[errMessage, setErrMessage] = useState('');

    // useEffect(() => {
    //     setTitle(item.title);
    //     setAmount(item.amount);
    //     setDate(item.date);
    // }, [item])

    const amountInput = useRef(null);
    const dateInput = useRef(null);
    const titleInput = useRef(null);

    const submitForm = (e) => {
        e.preventDefault()
        const editMode = !!item.id
        const amount = amountInput.current.value.trim() * 1
        const date = dateInput.current.value.trim()
        const title = titleInput.current.value.trim()
        
        if (!amount || !date || !title) {
            setErrMessage('请输入所有必选项')
        } else {
            if (amount < 0) {
                setErrMessage('价格数字必须大于0')
            } else if (!isValidDate(date)) {
                setErrMessage('请填写正确的日期格式')
            } else {
                setErrMessage('')
                if (editMode) {
                    onFormSubmit({ ...item, title: title, amount: amount, date: date }, editMode)
                } else {
                    onFormSubmit({ title: title, amount: amount, date: date }, editMode)
                }
            }
        }
       
    }
    const { title, amount, date } = item;
    return (
        <div>
            <form>
                <div className="form-group">
                    <label htmlFor="activity-form-title">Title</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="activity-form-title"
                        placeholder="请输入标题"
                        defaultValue={title}
                        ref={titleInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="activity-form-amount">Amount</label>
                    <input 
                        type="number"
                        className="form-control" 
                        id="activity-form-amount" 
                        placeholder="请输入金额" 
                        defaultValue={amount}
                        ref={amountInput}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="activity-form-date">Date</label>
                    <input 
                        type="date"
                        className="form-control"
                        id="activity-form-date"
                        defaultValue={date}
                        placeholder="请输入日期"
                        ref={dateInput}
                    />
                </div>
                <br/>
                <button type="submit" className="btn btn-primary" onClick={submitForm}>Submit</button>
                <button className="btn btn-secondary" onClick={onCancelSubmit}>Cancel</button>
            </form>
            <br/>
            {errMessage && <div className="alert alert-danger" role="alert">
                {errMessage}
            </div>}
        </div>
    )

})

ActivityForm.propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    onCancelSubmit: PropTypes.func.isRequired,
    item: PropTypes.object,
}

export default ActivityForm;

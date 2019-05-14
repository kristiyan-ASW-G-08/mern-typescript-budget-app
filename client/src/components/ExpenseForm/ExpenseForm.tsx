import React, {
  FunctionComponent,
  useState,
  SyntheticEvent,
  useContext,
} from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import axios from 'axios';
import Input from '../Input/Input';
import ValidationErrorsNotification from '../ValidationErrorsNotification/ValidationErrorsNotification';
import useValidationErrors from '../../hooks/useValidationErrors/useValidationErrors';
import RootStoreContext from '../../stores/RootStore/RootStore';
import { observer } from 'mobx-react-lite';
const LoginForm: FunctionComponent<RouteComponentProps> = observer(
  ({ history }): JSX.Element => {
    const {
      validationErrorMessages,
      validationErrorParams,
      toggleValidationErrors,
    } = useValidationErrors();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [cost, setCost] = useState<string>('');
    const { authStore } = useContext(RootStoreContext);
    const submitHandler = async (e: SyntheticEvent): Promise<void> => {
      e.preventDefault();
      try {
        const { token } = authStore.authState;
        const config = {
          headers: { Authorization: 'bearer ' + token },
        };
        const body = {
          title,
          description,
          cost,
        };
        const response = await axios.post(
          'http://localhost:8080/expense',
          body,
          config,
        );
      } catch (err) {
        if (err) {
          toggleValidationErrors(err.response.data.data);
        }
      }
    };
    return (
      <div className="columns">
        <div className="column is-one-third" />

        <div className="column is-one-third">
          <ValidationErrorsNotification
            validationErrorMessages={validationErrorMessages}
          />
          <form className="box" onSubmit={submitHandler}>
            <Input
              name="title"
              value={title}
              setValueHook={setTitle}
              type="text"
              placeholder="Title"
              validationErrorParams={validationErrorParams}
            />
            <Input
              name="description"
              value={description}
              setValueHook={setDescription}
              type="text"
              placeholder="Description"
              validationErrorParams={validationErrorParams}
            />
            <Input
              name="cost"
              value={cost}
              setValueHook={setCost}
              type="number"
              placeholder="Cost"
              validationErrorParams={validationErrorParams}
            />
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link">Add Expense</button>
              </div>
            </div>
          </form>
        </div>
        <div className="column is-one-third" />
      </div>
    );
  },
);

export default withRouter(LoginForm);
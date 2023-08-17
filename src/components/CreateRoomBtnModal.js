import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from 'rsuite';
import firebase from 'firebase/app';
import { useModelState } from '../misc/custom-hooks';
import ModalHeader from 'rsuite/lib/Modal/ModalHeader';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import ModalTitle from 'rsuite/lib/Modal/ModalTitle';
import { useCallback, useRef, useState } from 'react';
import { auth, database } from '../misc/firebase';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Chat name is reruired'),
  description: StringType().isRequired('Description name is reruired'),
});

const INITIAL_FORM = {
  name: '',
  description: '',
};

const CreateRoomBtnModal = () => {
  const { open, isOpen, close } = useModelState();

  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }

    setIsLoading(true);

    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      admins: {
        [auth.currentUser.uid]: true,
      },
    };

    try {
      await database.ref('rooms').push(newRoomData);

      Alert.info(`${formValue.name} has been created`, 4000);

      setIsLoading(false);
      setFormValue(INITIAL_FORM);
      close();
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <div className="mt-1">
      <Button block color="green" onClick={open}>
        <Icon icon="creative" /> Create new chat room
      </Button>

      <Modal show={isOpen} onHide={close}>
        <ModalHeader>
          <ModalTitle>New chat room</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room name</ControlLabel>
              <FormControl name="name" placeholder="Enter chat room name..." />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter room description..."
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create new chat room
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;

import React, {
  FC,
  useState,
} from 'react';
import { IoMdTrash } from 'react-icons/io';

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from 'fab-ui';
 
interface IProps {
  onDelete: (e: any) => void;
}
export const DeleteConfirmation: FC<IProps> = ({ onDelete }) => {
  const [open, onToggle] = useState(false);
  return (
    <>
      <Button size="sm"
        color="grey500"
        onClick={() => onToggle(true)}>
        X
      </Button>
      <Modal open={open}
        closeIconSize={0}
        styles={{
          modal: {
            padding: 0,
            borderRadius: '0.25rem',
          }
        }}
        onClose={() => onToggle(false)} center>
        <ModalBody>
          <h3>Are you sure you want to delete?</h3>
        </ModalBody>
        <ModalFooter>
          <Button
            type="button"
            outline
            onClick={() => onToggle(false)}>
            Cancel
            </Button>
          <Button
            type="button"
            color="danger500"
            hoverColor="danger400"
            onClick={(e) => {
              onToggle(false);
              onDelete(e);
            }}>
            <IoMdTrash />Delete
        </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

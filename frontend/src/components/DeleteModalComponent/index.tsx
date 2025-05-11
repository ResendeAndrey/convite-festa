import Modal from 'react-modal';
import { Button } from '../Button';

interface deleteModalProps {
  onClose: () => void
  isOpen: boolean
  onDelete: () => void
  name: string
}

const DeleteModalComponent = ({ onClose, isOpen, onDelete, name }: deleteModalProps) => {


  const onRemove = async () => {
    onDelete();
  }

  return <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    className='absolute p-5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-[25%] bg-white rounded-lg shadow-2xl max-h-8/10 border border-gray-400 overflow-y-auto'
    overlayClassName="fixed inset-0  bg-opacity-10 backdrop-blur-lg flex items-center justify-center z-50"
  >
    <h2 className='text-2xl font-semibold'>Deseja excluir {name} ?</h2>
    <div className='flex gap-2 mt-5 justify-center'>
      <Button className='w-50 bg-red-500' onClick={onRemove}>Sim</Button>
      <Button className='w-50 bg-gray-500' onClick={onClose}>Cancelar</Button>
    </div>
  </Modal>
}

export default DeleteModalComponent;
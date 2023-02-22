import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import FoodElementStyle from './FoodElement.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteIngredient } from "../../services/slices/constructorSlice";
import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';

function FoodElement({ price, type, name, isLocked, thumbnail, id, moveCard, index }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const deleteCard = () => {
    dispatch(deleteIngredient(id))
  }

  const [, drop] = useDrop({
    accept: "card",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <article ref={!isLocked ? ref : null} style={{ opacity: isDragging ? 0 : 1, cursor: !isLocked && 'pointer' }} className={FoodElementStyle.article}>
      {!isLocked && <DragIcon />}
      <ConstructorElement
        type={type}
        isLocked={isLocked}
        text={name}
        price={price}
        thumbnail={thumbnail}
        handleClose={() => deleteCard()}
      >
      </ConstructorElement>
    </article>
  )
}

FoodElement.propTypes = {
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isLocked: PropTypes.bool.isRequired,
  thumbnail: PropTypes.string.isRequired,
  id: PropTypes.string,
  moveCard: PropTypes.func,
  index: PropTypes.number,
};

export default FoodElement

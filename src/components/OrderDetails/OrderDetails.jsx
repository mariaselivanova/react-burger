import OrderDetailsStyle from './OrderDetails.module.css';
// eslint-disable-next-line no-unused-vars
import { Typography } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function OrderDetails({ orderNumber }) {
  return (
    <div className={OrderDetailsStyle.container}>
      <h2 className={`${OrderDetailsStyle.ordernumber} text text_type_digits-large`}>
        {orderNumber}
      </h2>
      <h3 className={`${OrderDetailsStyle.orderid} text text_type_main-medium`}>
        идентификатор заказа
      </h3>
      <div className={OrderDetailsStyle.img} />
      <p className={`${OrderDetailsStyle.confirmation} text text_type_main-default`}>
        Ваш заказ начали готовить
      </p>
      <p className={`${OrderDetailsStyle.text} text text_type_main-default text_color_inactive`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};

export default OrderDetails

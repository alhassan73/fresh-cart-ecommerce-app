import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../CartContextProvider/CartContextProvider";
import { UserContext } from "../UserContextProvider/UserContextProvider";
import Loader from "../Loader/Loader";
export default function Orders() {
  let { getUserId } = useContext(UserContext);
  let { getAllorders } = useContext(CartContext);
  let [allOrders, setAllorders] = useState([]);
  let [isLoading, setLoading] = useState(false);
  let userId = getUserId();
  function parseDate(dateString) {
    const parts = dateString.split(/[T.]/);
    return new Date(`${parts[0]}T${parts[1]}Z`);
  }

  async function getOrders() {
    setLoading(true);
    let { data } = await getAllorders(userId);
    setAllorders(data);
    setLoading(false);
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="min-vh-100 mt-5 py-4 mx-md-4">
            <h2>Your Orders</h2>
            {allOrders
              ?.sort((a, b) => parseDate(b.createdAt) - parseDate(a.createdAt))
              .map((order) => (
                <div
                  key={order.id}
                  className="row g-4 bg-white shadow-sm rounded-4 my-3 p-4 order-container transition"
                >
                  <div className="col-md-4 d-flex flex-column   justify-content-md-between align-items-sm-start align-items-md-start">
                    <h2 className="h5">
                      {order.createdAt.split("T").slice(0, 1)}
                    </h2>
                    <span className="h6 text-light-emphasis">
                      Order ID &#62; {order.id}
                    </span>
                  </div>
                  <div className="col-md-4 align-items-sm-center">
                    <h5>Order-Details :</h5>

                    {order.cartItems.map((orderItem) => (
                      <div key={orderItem._id}>
                        <span>{orderItem.count} x </span>
                        <span>
                          {orderItem.product.title
                            .split(" ")
                            .slice(0, 4)
                            .join(" ")}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="col-md-4 d-flex flex-column  justify-content-md-between align-items-sm-start align-items-md-end">
                    <span className="mb-4">
                      Status :
                      {order.isPaid === true ? (
                        <span className="ms-2 bg-green-light p-1 rounded-3">
                          Successful
                        </span>
                      ) : (
                        <span className="ms-2 bg-info-subtle p-1 rounded-3">
                          In Progress
                        </span>
                      )}
                    </span>
                    <h3> Total : {order.totalOrderPrice} EGP</h3>
                    <span className="fw-medium text-capitalize">
                      Payment Method : {order.paymentMethodType}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}

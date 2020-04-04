# frozen_string_literal: true

class ReviewController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    insert()
  end

  private

  def review_params
    params.require(:review)
  end

  def insert
  #   filtered_params = review_params

  #   ActiveRecord::Base.connection.begin_db_transaction

  #   # Insert the order
  #   ActiveRecord::Base.connection.exec_query(
  #     "INSERT INTO Orders(customer_id, promo_id, restaurant_id, point_offset, payment_method,
  #                  delivery_fee, total_price, date_time, status)
  #     VALUES (#{current_user.id},  #{filtered_params['promo_id']},
  #             #{filtered_params['restaurant_id']}, #{filtered_params['point_offset']},
  #             '#{filtered_params['payment_method']}', #{filtered_params['delivery_fee']},
  #             #{filtered_params['total_price']}, CURRENT_TIMESTAMP, '#{filtered_params['status']}')"
  #   )

  #   # Get the user's latest order
  #   stored_order = ActiveRecord::Base.connection.exec_query(
  #     "SELECT *
  #     FROM Orders
  #     WHERE date_time >= ALL (
  #             SELECT date_time
  #             FROM Orders O
  #             WHERE O.customer_id = #{current_user.id}
  #           )"
  #   ).to_a[0]

  #   # Insert corresponding Delivers entry
  #   ActiveRecord::Base.connection.exec_query(
  #     "INSERT INTO Delivers(oid, customer_location, order_time)
  #     VALUES (#{stored_order['oid']}, '#{filtered_params['customer_location']}',
  #             CURRENT_TIMESTAMP)"
  #   )

  #   # Insert corresponding Comprises entry and add num_order to food
  #   foods = filtered_params['foods']
  #   foods.each do |foodKey, foodDetails|
  #     ActiveRecord::Base.connection.exec_query(
  #       "INSERT INTO Comprises
  #       VALUES (#{stored_order['oid']}, #{foodDetails['id']}, #{foodDetails['quantity']})"
  #     )
  #   end

  #   # Deduct Customer used reward points and add after payment
  #   ActiveRecord::Base.connection.exec_query(
  #     "UPDATE Customers
  #     SET reward_points = reward_points - #{stored_order['point_offset']}
  #                         + #{stored_order['total_price'].to_i}
  #     WHERE id = #{current_user.id}"
  #   )

  #   ActiveRecord::Base.connection.commit_db_transaction
  end
end
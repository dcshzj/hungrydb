# frozen_string_literal: true

class Api::V1::Customer::CustomerController < Api::V1::BaseController
  
  # rubocop:disable Metrics/MethodLength
  def index
    review_query = nil
    last_review_query = nil
    eligiblepromos_query = helpers.retrieve_two_promos # Limit with SQL
    respond_with 'customer': helpers.retrieve_customer,
                  'reviews': review_query,
                  'last_order': helpers.retrieve_last_order,
                  'last_review': last_review_query,
                  'promos': eligiblepromos_query
  end
  # rubocop:enable Metrics/MethodLength

  def create
    # insert_customer = "INSERT INTO Customers(
    #                    user_id, can, cvv, rewardPoints, locationHistory
    #                    )
    #                    VALUES (#{item_params_values})"
    # respond_with :api, :v1, ActiveRecord::Base.connection.execute(insert_customer)
    respond_with :api, :v1, Customer.create(item_params)
  end

  def destroy
    delete_customer = "DELETE FROM Customers
                       WHERE Customers.id = #{Customer[:id]}"
    respond_with ActiveRecord::Base.connection.execute(delete_customer)
    # respond_with Customer.destroy(Customer[:id])
  end

  def update
    # update_customer = "UPDATE Customers
    #                    SET can = , cvv = , rewardPoints = , locationHistory =
    #                    WHERE Customers.id = Customer[:id]"
    # respond_with ActiveRecord::Base.connection.execute(update_customer)
    customer = Customer.find(params['id'])
    customer.update_attributes(item_params)
    respond_with customer, json: customer
  end

  private

  def item_params
    # Returns key-value set
    params.require(:customer)
          .permit(:user_id, :can, :cvv, :rewardPoints, :locationHistory)
  end
end

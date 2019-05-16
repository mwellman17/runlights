class Api::V1::InstrumentsController < ApplicationController
  before_action :authenticate_user!, except: []
  protect_from_forgery unless: -> { request.format.json? }
  serialization_scope :current_user

  def validate_number(num)
    if num.to_i <= 0
      nil
    else
      num.to_i
    end
  end

  def create
    response = JSON.parse(request.body.read)
    quantity = validate_number(response['quantity'])
    channel = validate_number(response['channel'])
    address = validate_number(response['address'])
    unit_number = validate_number(response['unitNumber'])
    if Mode.exists?(response['fixtureMode'])
      mode = Mode.find(response['fixtureMode'])
      footprint = mode.footprint
      fixture = mode.fixture
    end
    show = Show.find(response['showId'])
    instruments = []
    instrument = Instrument.new({
        fixture: fixture,
        mode: mode,
        show: show,
        purpose: response['purpose'],
        channel: channel,
        address: address,
        circuit: response['circuit'],
        accessory: response['accessory'],
        color: response['color'],
        gobo: response['gobo'],
        position: response['position'],
        unit_number: unit_number
      })
    if instrument.save
      instruments << instrument
      if quantity
        (quantity - 1).times do
          if channel
            channel += 1
          end
          if address
            address += footprint
          end
          if unit_number
            unit_number += 1
          end
          instruments << Instrument.create!({
            fixture: fixture,
            mode: mode,
            show: show,
            purpose: response['purpose'],
            channel: channel,
            address: address,
            circuit: response['circuit'],
            accessory: response['accessory'],
            color: response['color'],
            gobo: response['gobo'],
            position: response['position'],
            unit_number: unit_number
          })
        end
      end
      render json: instruments
    else
      render json: { error: instrument.errors.full_messages.join(', ') }
    end
  end

  def update
    response = JSON.parse(request.body.read)
    if Instrument.exists?(response['instrument_id'])
      instrument = Instrument.find(response['instrument_id'])
      instrument[response['column_name']] = response['value']
      if instrument.save
        render json: instrument
      else
        render json: { error: instrument.errors.full_messages.join(', ') }
      end
    else
      render json: { error: "An error occurred." }
    end
  end

  def destroy
    if Instrument.exists?(params['instrument_id'])
      instrument = Instrument.find(params['instrument_id'])
      instrument.destroy
      render json: instrument
    else
      render json: { error: "An error occurred." }
    end
  end
end

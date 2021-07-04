class Api::V1::ShowsController < ApplicationController
  before_action :authenticate_user!, except: [:channels, :instruments]
  protect_from_forgery unless: -> { request.format.json? }
  serialization_scope :current_user

  def show
    if Show.exists?(params[:id])
      show = Show.find(params[:id])
      if current_user.shows.includes(show)
        fixtures = []
        current_user.favorites.each do |favorite|
          fixtures << Fixture.find(favorite.fixture_id)
        end
        instruments = show.instruments
        render json: {
          user: ActiveModelSerializers::SerializableResource.new(current_user),
          show: ActiveModelSerializers::SerializableResource.new(show),
          fixtures: ActiveModel::Serializer::CollectionSerializer.new(fixtures, serializer: FixturePickerSerializer),
          instruments: ActiveModel::Serializer::CollectionSerializer.new(instruments, serializer: InstrumentSerializer)
        }
      else
        render json: { error: "You do not have access to this show."}
      end
    else
      render json: { error: "Not found."}
    end
  end

  def create
    response = JSON.parse(request.body.read)
    name = response['name']
    shareable = response["shareable"]
    user = User.find(response['user'])
    show = Show.new({ user: user, name: name, shareable: shareable })
    if show.save
      render json: show
    else
      render json: { error: show.errors.full_messages.join(', ') }
    end
  end

  def update
    response = JSON.parse(request.body.read)
    show = Show.find(request.params[:id])
    if show
      show.name = response['name']
      show.shareable = response['shareable']
      if show.save
        render json: show
      else
        render json: { error: show.errors.full_messages.join(', ') }
      end
    else
      render json: { error: "Not Found" }
    end
  end

  def instruments
    if Show.exists?(params['id'])
      show = Show.find(params['id'])
      if show.is_shareable? || current_user&.shows&.include?(show)
        instruments = show.instruments.sort_by { |a| [a.position.nil? ? 1 : 0, a.position.blank? ? 1 : 0, a.position, a.unit_number ? 1 : 0, a.unit_number] }
        data = [%w[Position U# Fixture Purpose Chan Addr Ckt C# Acc]]

        instruments.each do |instrument|
          if instrument.unit_number && instrument.unit_number * 10 % 10 == 0
            unit_number = instrument.unit_number.floor
          else
            unit_number = instrument.unit_number
          end
          data += [[
            instrument.position,
            unit_number,
            instrument.fixture.name,
            instrument.purpose,
            instrument.channel,
            display_address(instrument.universe, instrument.address),
            instrument.circuit_name,
            instrument.circuit_number,
            "#{instrument.color} #{instrument.gobo} #{instrument.accessory}"
          ]]
        end
        pdf = PaperworkPdf.new(data, show, "Instrument Schedule")
        send_data pdf.render, filename: "#{show.name} Instrument Schedule", type: "application/pdf", disposition: "inline"
      else
        nothing_to_show
      end
    else
      nothing_to_show
    end
  end

  def channels
    if Show.exists?(params['id'])
      show = Show.find(params['id'])
      if show.is_shareable? || current_user&.shows&.include?(show)
        instruments = show.instruments.sort_by { |a| [a.channel ? 0 : 1, a.channel] }
        data = [%w[Chan Addr Fixture Purpose Position U# Ckt C# Acc]]

        instruments.each do |instrument|
          if instrument.unit_number && instrument.unit_number * 10 % 10 == 0
            unit_number = instrument.unit_number.floor
          else
            unit_number = instrument.unit_number
          end
          data += [[
            instrument.channel,
            display_address(instrument.universe, instrument.address),
            instrument.fixture.name,
            instrument.purpose,
            instrument.position,
            unit_number,
            instrument.circuit_name,
            instrument.circuit_number,
            "#{instrument.color} #{instrument.gobo} #{instrument.accessory}"
          ]]
        end
        pdf = PaperworkPdf.new(data, show, "Channel Hookup")
        send_data pdf.render, filename: "#{show.name} Channel Hookup", type: "application/pdf", disposition: "inline"
      else
        nothing_to_show
      end
    else
      nothing_to_show
    end
  end

  def nothing_to_show
    pdf = NothingHerePdf.new
    send_data pdf.render, filename: "Nothing to show.", type: "application/pdf", disposition: "inline"
  end

  def display_address(universe, address)
    if universe && address
      "#{universe}/#{address}"
    else
      address
    end
  end
end

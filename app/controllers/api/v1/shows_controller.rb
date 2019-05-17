class Api::V1::ShowsController < ApplicationController
  before_action :authenticate_user!, except: []
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
    user = User.find(response['user'])
    show = Show.new({ user: user, name: name })
    if show.save
      render json: show
    else
      render json: { error: show.errors.full_messages.join(', ') }
    end
  end

  def instruments
    if Show.exists?(params['id'])
      show = Show.find(params['id'])
      if current_user.shows.include?(show)
        instruments = show.instruments
        pdf = InstrumentSchedulePdf.new(instruments, show)
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
      if current_user.shows.include?(show)
        instruments = show.instruments
        pdf = ChannelHookupPdf.new(instruments, show)
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
end

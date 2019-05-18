require 'prawn'

class ChannelHookupPdf < Prawn::Document
  def initialize(instruments, show)
    super(top_margin: 70)
    @instruments = instruments.sort_by { |a| [a.channel ? 0 : 1, a.channel] }
    @show = show

    header
    channel_hookup
    footer
  end

  def header
    text @show.name + " Channel Hookup"
  end

  def channel_hookup
    data = [[
      "Chan",
      "Univ",
      "Addr",
      "Fixture",
      "Purpose",
      "Position",
      "Unit",
      "Ckt Name",
      "Ckt#"
    ]]

    @instruments.each do |instrument|
      data += [[
        instrument.channel,
        instrument.universe,
        instrument.address,
        instrument.fixture.name,
        instrument.purpose,
        instrument.position,
        instrument.unit_number,
        instrument.circuit_name,
        instrument.circuit_number
      ]]
    end
    table(data, :header => true)
  end

  def footer
    move_cursor_to 20
    text "Generated by RUNLIGHTS (pre-alpha)"
  end
end
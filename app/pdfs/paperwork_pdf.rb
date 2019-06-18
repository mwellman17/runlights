require 'prawn'

class PaperworkPdf < Prawn::Document
  def initialize(data, show, type)
    super(top_margin: 70)
    @data = data
    @show = show
    @paperwork_type = type

    header
    paperwork
    footer
    number_pages "Page <page> of <total>", {
      :color => "A67C00",
      :start_count_at => 1,
      :at => [bounds.right - 100, 0],
      :align => :right,
    }
  end

  def header
    fill_color "A67C00"
    text_box @show.name,
      :align => :left,
      :style => :bold
    text_box Time.now.strftime("%m/%d/%Y"),
      align: :right,
      :style => :bold
    text @paperwork_type,
      align: :center,
      :style => :bold,
      :size => 20
  end

  def paperwork
    fill_color "000000"

    table(
      @data,
      :header => true,
      :width => bounds.width,
      :cell_style => {
        :borders => [:bottom],
        :border_color => "C8C8C8"
      },
      :row_colors => [nil, 'F9EECA']
    ) do
      style row(0), :borders => [:bottom],
        :background_color => "FAC100", :font_style => :bold
    end
  end

  def footer
    fill_color "A67C00"
    move_cursor_to 20
    text "Generated by RUNLIGHTS(alpha)", :align => :center
  end
end

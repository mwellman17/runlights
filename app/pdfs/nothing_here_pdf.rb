class NothingHerePdf < Prawn::Document
  def initialize
    super(top_margin: 70)
    text "RUNLIGHTS doesn't have that."
  end
end

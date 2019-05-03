Manufacturer.destroy_all
Fixture.destroy_all
Mode.destroy_all

ofl = User.create!(username: "OFL", email: "email@example.com", password: "password")

def get_footprint(file, mode)
  chan = mode['channels']
  base_count = chan.count {|item| item.is_a?(String) || item.nil? }
  if base_count == chan.length
    return base_count
  else
    matrix = chan.find {|item| item.is_a?(Hash) }
    temp_channels = matrix['templateChannels'].length
    if matrix['repeatFor'].is_a?(Array)
      multiplier = matrix['repeatFor'].length
      return multiplier * temp_channels + base_count
    elsif file['matrix']['pixelCount']
      multiplier = 1
      file['matrix']['pixelCount'].each {|item| multiplier *= item }
      return multiplier * temp_channels + base_count
    else
      multiplier = file['matrix']['pixelKeys'].flatten.length
      return multiplier * temp_channels + base_count
    end
  end
end

Dir.foreach('./fixtures') do |directory|
  next if directory == '.' or directory == '..'
  manufacturer = Manufacturer.create!({ name: directory })
  Dir.foreach("./fixtures/#{directory}") do |json|
    next if json == '.' or json == '..'
    file = JSON.parse(File.read "./fixtures/#{directory}/#{json}")
    name = file['name']
    short_name = file['shortName']
    manual = nil
    if file['links']
      if file['links']['manual']
        manual = file['links']['manual'][0]
      end
    end
    weight = nil
    wattage = nil
    if file['physical']
      weight = file['physical']['weight']
      wattage = file['physical']['power']
    end
    fixture = Fixture.create!({
      name: name,
      short_name: short_name,
      manual: manual,
      weight: weight,
      wattage: wattage,
      manufacturer: manufacturer,
      user: ofl
    })
    if file['modes']
      file['modes'].each do |mode|
        mode_name = mode['name']
        mode_short_name = mode['short_name']
        Mode.create!({
          name: mode_name,
          short_name: mode_short_name,
          footprint: get_footprint(file, mode),
          fixture: fixture
        })
      end
    else
      Mode.create!({
        name: "NA",
        footprint: 1,
        fixture: fixture
      })
    end

  end
end

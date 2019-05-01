Manufacturer.destroy_all
Fixture.destroy_all
Mode.destroy_all

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
      manufacturer: manufacturer
    })
    if file['modes']
      file['modes'].each do |mode|
        mode_name = mode['name']
        mode_short_name = mode['short_name']
        footprint = mode['channels'].length
        Mode.create!({
          name: mode_name,
          short_name: mode_short_name,
          footprint: footprint,
          fixture: fixture
        })
      end
    end
  end
end

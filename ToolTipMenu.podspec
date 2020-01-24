require 'json'

package = JSON.parse File.read(File.join(__dir__, 'package.json'))

Pod::Spec.new do |s|
  s.name = 'ToolTipMenu'
  s.version = package['version']
  s.summary = package['description']
  s.license = package['license']
  s.authors = package['author']['name']
  s.homepage = 'https://github.com/renatoalencar/react-native-tooltip'
  s.source = { :git => 'https://github.com/renatoalencar/react-native-tooltip.git', :tag => "v#{s.version}" }
  s.platforms = { :ios => '7.0' }
  s.source_files = 'ToolTipMenu/*.{h,m}'

  s.dependency 'React'
end

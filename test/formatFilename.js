const expect = require('chai').expect;
var background = require('../src/background');

describe('formatFilename', function() {
    it('should return input string if no format specifiers present', function() {
        expect(background.formatFilename({}, 'foobar')).to.equal('foobar');
    });
    it('should return data both before and after format specifier', function() {
        expect(background.formatFilename({}, 'foo%%bar')).to.equal('foo%bar');
    });
    it('should return % for %% specifier', function() {
        expect(background.formatFilename({}, '%%')).to.equal('%');
    });
    it('should return filename for %f specifier', function() {
        expect(background.formatFilename({filename: 'example.json'}, '%f')).to.equal('example.json');
    });
    it('should return year for %y specifier', function() {
        expect(background.formatFilename({startTime: '2020-09-10T14:53:08'}, '%y')).to.equal('2020');
    });
    it('should return 2 digit month for %m specifier', function() {
        expect(background.formatFilename({startTime: '2020-12-10T14:53:08'}, '%m')).to.equal('12');
        expect(background.formatFilename({startTime: '2020-09-10T14:53:08'}, '%m')).to.equal('09');
    });
    it('should return 2 digit day of month for %d specifier', function() {
        expect(background.formatFilename({startTime: '2020-09-10T14:53:08'}, '%d')).to.equal('10');
        expect(background.formatFilename({startTime: '2020-09-01T14:53:08'}, '%d')).to.equal('01');
    });
    it('should return 2 digit hour for %h specifier', function() {
        expect(background.formatFilename({startTime: '2020-09-10T14:53:08'}, '%h')).to.equal('14');
        expect(background.formatFilename({startTime: '2020-09-10T02:53:08'}, '%h')).to.equal('02');
    });
    it('should return 2 digit minute for %M specifier', function() {
        expect(background.formatFilename({startTime: '2020-09-10T14:53:08'}, '%M')).to.equal('53');
        expect(background.formatFilename({startTime: '2020-09-10T14:03:08'}, '%M')).to.equal('03');
    });
    it('should return 2 digit second for %s specifier', function() {
        expect(background.formatFilename({startTime: '2020-09-10T14:53:38'}, '%s')).to.equal('38');
        expect(background.formatFilename({startTime: '2020-09-10T14:53:08'}, '%s')).to.equal('08');
    });
    it('should return host for %H specifier', function() {
        expect(background.formatFilename({url: 'https://willtc.uk/demo/example.json' }, '%H')).to.equal('willtc.uk');
        expect(background.formatFilename({url: 'https://willtc.uk:8433/demo/example.json' }, '%H')).to.equal('willtc.uk');
    });
});

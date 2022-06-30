const ISO_8859_1 = (str) => {
    return str.replace(/[^\x00-\x7F]/g, function (c) {
        return '#' + (c.charCodeAt(0).toString(16).toUpperCase()).slice(-4);
    });
}
const SpaceIso = (str) => {
    return str.replace(/\s/g, function (c) {
        return '#' + (c.charCodeAt(0).toString(16).toUpperCase()).slice(-4);
    });
}

const Cross_multiply = (a,b) => {
    return (b * 100)/a
}

const SelectOption = (widget, option) => {
    console.log(Cross_multiply(3555770, 2500000).toFixed(2))
    option = `/${SpaceIso(ISO_8859_1(option))}`
    widget.forEach(widget => {
        let select = widget.getOnValue().encodedName.toString('utf8')
        if (select === option) {
            widget.setAppearanceState(widget.getOnValue())
        }
    })
}
module.exports = SelectOption;
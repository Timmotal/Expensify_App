import React from 'react';
import moment from 'moment';
import ExpensiTextInput from '../ExpensiTextInput';
import CONST from '../../CONST';
import {propTypes, defaultProps} from './datepickerPropTypes';
import withWindowDimensions, {windowDimensionsPropTypes} from '../withWindowDimensions';

const webDatePickerPropTypes = {
    ...propTypes,
    ...windowDimensionsPropTypes,
};

class WebDatepicker extends React.Component {
    constructor(props) {
        super(props);

        this.raiseDateChange = this.raiseDateChange.bind(this);

        /* We're using uncontrolled input otherwise it wont be possible to
        * raise change events with a date value - each change will produce a date
        * and make us reset the text input */
        this.defaultValue = props.value
            ? moment(props.value).format(CONST.DATE.MOMENT_FORMAT_STRING)
            : '';
    }

    componentDidMount() {
        if (this.inputRef) {
            // Adds nice native datepicker on web/desktop. Not possible to set this through props
            this.inputRef.type = 'date';
        }
    }

    /**
     * Trigger the `onChange` handler when the user input has a complete date or is cleared
     * @param {string} text
     */
    raiseDateChange(text) {
        if (!text) {
            this.props.onChange(null);
            return;
        }

        const asMoment = moment(text);
        if (asMoment.isValid()) {
            const asDate = asMoment.toDate();
            this.props.onChange(asDate);
        }
    }

    render() {
        const {
            label,
            placeholder,
            errorText,
            translateX,
            containerStyles,
            disabled,
            isMediumScreenWidth,
        } = this.props;

        return (
            <ExpensiTextInput
                forceActiveLabel={isMediumScreenWidth}
                ref={input => this.inputRef = input}
                label={label}
                onChangeText={this.raiseDateChange}
                defaultValue={this.defaultValue}
                placeholder={placeholder}
                errorText={errorText}
                containerStyles={containerStyles}
                translateX={translateX}
                disabled={disabled}
            />
        );
    }
}

WebDatepicker.propTypes = webDatePickerPropTypes;
WebDatepicker.defaultProps = defaultProps;

export default withWindowDimensions(WebDatepicker);

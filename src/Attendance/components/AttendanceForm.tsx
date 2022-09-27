import React, {
  FC,
  useContext,
} from 'react';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';
import Select from 'react-select';
import { bindActionCreators } from 'redux';

import Col from '@bit/pollen8.fab-ui.col';
import Label from '@bit/pollen8.fab-ui.label';
import Row from '@bit/pollen8.fab-ui.row';

import { UserContext } from '../../App';
import { blankMember } from '../../Members/Members';
import { memberOptions } from '../../Members/selectors/memberOptions';
import { IGlobalState } from '../../reducers';
import { IAttendance } from '../Attendance';
import * as actions from '../AttendanceActions';

interface IProps {
  formData: IAttendance;
  setFormData: (formData: IAttendance) => void;
}

const mapStateToProps = (state: IGlobalState) => ({
  attendance: state.attendance.data,
  clubNightManagers: state.attendance.clubNightManagers,
  memberOptions: memberOptions(state),
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({
    upsertClubNightManager: actions.upsertClubNightManager,
  }, dispatch);

type Props = IProps & ReturnType<typeof mapDispatchToProps>
  & ReturnType<typeof mapStateToProps>;

const AttendanceForm: FC<Props> = ({
  formData,
  clubNightManagers,
  memberOptions,
  setFormData,
  upsertClubNightManager,
}) => {
  const m = clubNightManagers.find((manager) => manager.clubNight === formData.clubNight);
  const manager = m === undefined
    ? { value: blankMember, label: '' }
    : { value: m.member, label: m.member.name };
  const user = useContext(UserContext);
  return (
    <Row>
      <Col>
        <Label>
          Club night
        </Label>
        <DatePicker
          clearIcon={null}
          value={new Date(formData.clubNight)}
          onChange={(v: any) => {
            const date = Array.isArray(v) ? v[0] : v;
            const clubNight = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
            setFormData({
              ...formData,
              clubNight,
            });
          }}

          returnValue="start"
        />
      </Col>
      <Col>
        <Label>
          Manager
        </Label>
        <Select
          options={memberOptions}
          value={manager}
          onChange={(v: any) => {
            if (!v) {
              return;
            }
            upsertClubNightManager({
              clubNight: formData.clubNight,
              createdBy: user !== null ? String(user.email) : '',
              id: m ? m.id : '',
              member: v.value,
            });
          }} />
      </Col>
    </Row>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AttendanceForm);

import React from 'react';
import { useSelector } from 'react-redux';
import { Table, Progress, Tag } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { UserTableStyleWrapper } from '../style';
import { TableWrapper } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';

const UserListTable = () => {
  const { users } = useSelector(state => {
    return {
      users: state.users,
    };
  });

  const usersTableData = [];

  users.map(user => {
    const { id, name, scanTime, img, status, cover, time, percentage } = user;

    return usersTableData.push({
      key: id,
      user: (
        <div className="user-info">
          {/* <figure>
            <img style={{ width: '40px' }} src={require(`../../../${img}`)} alt="" />
          </figure> */}
          <figcaption>
            <Heading className="user-name" as="h6">
              {name}
            </Heading>
            <span className="user-designation">id:xxxxx</span>
          </figcaption>
        </div>
      ),
      email: (
        <figure>
          <img style={{ "max-height": "100px", width: 'auto' }} src={require(`../../../${cover}`)} alt="" />
        </figure>
      ),
      company: 'Business Development',
      referer: "xxx.xxx.xxx",
      scanTime: scanTime,
      status: (
        <div>
          <div className="project-list-progress">
            <Progress percent={percentage} strokeWidth={5} className="progress-primary" />
          </div>
          <Tag className={`status-text ${status}`}>{status}</Tag>
        </div>

      ),
      action: (
        <div className="table-actions">
          <>
            <Button className="btn-icon" type="primary" to="#" shape="circle">
              <FeatherIcon icon="eye" size={16} />
            </Button>
            <Button className="btn-icon" type="info" to="#" shape="circle">
              <FeatherIcon icon="edit" size={16} />
            </Button>
            {/* <Button className="btn-icon" type="danger" to="#" shape="circle">
              <FeatherIcon icon="trash-2" size={16} />
            </Button> */}
          </>
        </div>
      ),
    });
  });

  const usersTableColumns = [
    {
      title: 'ScanTime',
      dataIndex: 'scanTime',
      key: 'scanTime',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Document Image',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Referer',
      dataIndex: 'referer',
      key: 'referer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '170px',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: 'auto',
    },
  ];

  const rowSelection = {
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <Cards headless>
      <UserTableStyleWrapper>
        <TableWrapper className="table-responsive">
          <Table
            rowSelection={rowSelection}
            dataSource={usersTableData}
            columns={usersTableColumns}
            pagination={{
              defaultPageSize: 10,
              total: usersTableData.length,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </TableWrapper>
      </UserTableStyleWrapper>
    </Cards>
  );
};

export default UserListTable;

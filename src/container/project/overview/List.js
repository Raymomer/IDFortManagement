import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Progress, Pagination, Tag, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import Heading from '../../../components/heading/heading';
import { Cards } from '../../../components/cards/frame/cards-frame';
// import { Tag } from '../../../components/tags/tags';
import { ProjectPagination, ProjectListTitle, ProjectListAssignees, ProjectList } from '../style';
import { linkdinOverviewGetData, linkdinOverviewFilterData } from '../../../redux/chartContent/actionCreator';
import { customTooltips } from '../../../components/utilities/utilities';
import { ChartjsLineChart } from '../../../components/charts/chartjs';
import { Dropdown } from '../../../components/dropdown/dropdown';

const ProjectLists = () => {
  // const project = useSelector(
  //   state => state.projects.data);
  const dispatch = useDispatch();
  const { linkdinOverviewState, liIsLoading, project } = useSelector(state => {
    return {
      project: state.projects.data,
      linkdinOverviewState: state.chartContent.linkdinOverviewData,
      liIsLoading: state.chartContent.liLoading,
    };
  });
  console.log(linkdinOverviewState);
  const [state, setState] = useState({
    projects: project,
    current: 0,
    pageSize: 0,
    linkdinOverviewTabActive: 'month',
  });
  const { projects } = state;

  useEffect(() => {
    if (project) {
      setState({
        projects: project,
      });
    }
  }, [project]);

  useEffect(() => {
    if (linkdinOverviewGetData) {
      dispatch(linkdinOverviewGetData());
    }
  }, [dispatch]);

  const chartOptions = {
    tooltips: {
      yAlign: 'bottom',
      xAlign: 'center',
      mode: 'nearest',
      position: 'nearest',
      intersect: false,
      enabled: false,
      custom: customTooltips,
      callbacks: {
        labelColor(tooltipItem, chart) {
          return {
            backgroundColor: '#20C997',
          };
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: false,
    },
    layout: {
      padding: {
        left: '0',
        right: 8,
        top: 15,
        bottom: -10,
      },
    },
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: false,
      labels: {
        display: false,
      },
    },
    elements: {
      line: {
        tension: 0,
      },
    },
    scales: {
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
            color: '#e5e9f2',
            borderDash: [8, 4],
            zeroLineColor: 'transparent',
            beginAtZero: true,
          },
          ticks: {
            display: false,
          },
        },
      ],
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
            color: '#e5e9f2',
            borderDash: [8, 4],
            zeroLineColor: 'transparent',
          },
          ticks: {
            display: false,
          },
        },
      ],
    },
  };

  const lineChartPointStyle = {
    borderColor: '#C6D0DC',
    borderWidth: 2,
    fill: false,
    pointRadius: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
    pointBackgroundColor: [
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      'transparent',
      '#20C997',
    ],
    pointHoverBackgroundColor: '#20C997',
    pointHoverRadius: 6,
    pointBorderColor: 'transparent',
  };

  const handleActiveChangeLinkdin = value => {
    setState({
      ...state,
      linkdinOverviewTabActive: value,
    });
    dispatch(linkdinOverviewFilterData(value));
  };

  const onShowSizeChange = (current, pageSize) => {
    setState({ ...state, current, pageSize });
  };

  const onHandleChange = (current, pageSize) => {
    // You can create pagination in here
    setState({ ...state, current, pageSize });
  };

  const dataSource = [];

  if (projects.length)
    projects.map(value => {
      const { id, title, status, category, percentage } = value;
      return dataSource.push({
        key: id,
        profile: (
          <ProjectListTitle>
            <Heading as="h4">
              <Link to={`/admin/project/projectDetails/${id}`}>{title}</Link>
            </Heading>

            <p>{category}</p>
          </ProjectListTitle>
        ),
        createdDate: <span className="date-started">26 Dec 2019</span>,
        tags: (
          <ProjectListAssignees>
            <div className="taglist-wrap">
              <Tag>Tag 1</Tag>
              <Tag>Tag 1</Tag>
              <Tag>Tag 1</Tag>
              <Tag>Tag 1</Tag>
            </div>
          </ProjectListAssignees>
        ),
        status: <Tag className={status}>{status}</Tag>,
        usage: (
          // <div className="project-list-progress">
          //   <Progress percent={status === 'complete' ? 100 : percentage} strokeWidth={5} className="progress-primary" />
          //   <p>12/15 Task Completed</p>
          // </div>
          liIsLoading? (
            <div className="sd-spin">
              <Spin />
            </div>
          ) : (
          <Row className="line-chart-row">
            <Col xxl={10} xs={24}>
              <div className="growth-upward">
                <p>Clicks</p>
                <Heading as="h4">
                  {linkdinOverviewState.post.data}
                  <sub>
                    <FeatherIcon icon="arrow-up" size={14} />
                    25%
                  </sub>
                </Heading>
              </div>
            </Col>
            <Col xxl={14} xs={24}>
              <div className="border-linechart">
                <ChartContainer className="parentContainer">
                  <ChartjsLineChart
                    height={55}
                    datasets={[
                      {
                        data: linkdinOverviewState.post.chartValue,
                        ...lineChartPointStyle,
                      },
                    ]}
                    options={chartOptions}
                  />
                </ChartContainer>
              </div>
            </Col>
          </Row>
          )
        ),
        action: (
          <Dropdown
            className="wide-dropdwon"
            content={
              <>
                <Link to="#">View</Link>
                <Link to="#">Edit</Link>
                <Link to="#">Delete</Link>
              </>
            }
          >
            <Link to="#">
              <FeatherIcon icon="more-horizontal" size={18} />
            </Link>
          </Dropdown>
        ),
      });
    });

  const columns = [
    {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Usage',
      dataIndex: 'usage',
      key: 'usage',
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  return (
    <Row gutter={25}>
      <Col xs={24}>
        <Cards headless>
          <ProjectList>
            <div className="table-responsive">
              <Table pagination={false} dataSource={dataSource} columns={columns} />
            </div>
          </ProjectList>
        </Cards>
      </Col>
      <Col xs={24} className="pb-30">
        <ProjectPagination>
          {projects.length ? (
            <Pagination
              onChange={onHandleChange}
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              pageSize={10}
              defaultCurrent={1}
              total={40}
            />
          ) : null}
        </ProjectPagination>
      </Col>
    </Row>
  );
};

export default ProjectLists;

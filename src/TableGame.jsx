import React, { useEffect, useContext, useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { GameContext } from "./context/GameContext";
import { HomeOutlined, SettingFilled, SmileOutlined, SyncOutlined, LoadingOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Input, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const TableGame = () => {
  const [inputFilter, setInputFilter] = useState({
    genre: "",
    platform: "",
    release: "",
  });
  let { State, Function } = useContext(GameContext);
  let { dataGame, setDataGame, fetchStatus, setFetchStatus } = State;
  let { getDataGame, handleDeleteGame, handleEditGame } = Function;
  //   let shorten = (text, max) => {
  //     return text && text.length > max ? text.slice(0, max).split(" ").slice(0, -1).join(" ") : text;
  //   };
  useEffect(() => {
    if (fetchStatus) {
      getDataGame();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);
  const onSearch = (value) => {
    let data = dataGame;

    data = data.filter((filter) => filter.name.toLowerCase().includes(value.toLowerCase()));
    console.log(data);
    setDataGame(
      data.map((d, index) => {
        let { id, name, genre, singlePlayer, multiplayer, platform, release, image_url } = d;

        return {
          id,
          name,
          genre,
          singlePlayer,
          multiplayer,
          platform,
          release,
          image_url,
        };
      })
    );
    if (fetchStatus) {
      getDataGame();
      setFetchStatus(false);
    }
  };
  const handleChangeGameFilter = (e) => {
    let value = e.target.value;
    let nameOfInput = e.target.name;
    setInputFilter({ ...inputFilter, [nameOfInput]: value });
    console.log(inputFilter);
  };
  const handleFilter = (event) => {
    event.preventDefault();

    let data = dataGame;
    data = data.filter((value) => {
      let genre = value.genre.toLowerCase().includes(inputFilter.genre.toLowerCase());
      // let genre = filter.genre.toLowerCase() === inputFilter.genre.toLowerCase();
      let release = parseInt(value.release) >= parseInt(inputFilter.release);
      let platform = value.platform.toLowerCase().includes(inputFilter.platform.toLowerCase());
      return genre || release || platform;
    });

    setDataGame(
      data.map((d, index) => {
        let { id, name, genre, singlePlayer, multiplayer, platform, release, image_url } = d;

        return {
          id,
          name,
          genre,
          singlePlayer,
          multiplayer,
          platform,
          release,
          image_url,
        };
      })
    );
    console.log(dataGame);
    if (fetchStatus) {
      getDataGame();
      setFetchStatus(false);
    }
  };
  const handleClearFilter = () => {
    setInputFilter({
      genre: "",
      year: "",
      rating: "",
    });
    console.log(inputFilter);

    // getDataGame();
    setFetchStatus(true);
  };
  const columns = [
    {
      name: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,

      multiple: 2,
    },
    {
      title: "Display",
      dataIndex: "image_url",
      key: "image_url",
      render: (text) => <img src={text} alt="" style={{ height: "200px", width: "133px", objectFit: "cover" }} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      //   sortOrder: sortedInfo.columnKey === "title" && sortedInfo.order,
      //   ellipsis: true,
      //   sortDirections: ["descend"],
      multiple: 2,
    },

    {
      title: "Release",
      dataIndex: "release",
      key: "release",
      sorter: {
        compare: (a, b) => a.release - b.release,
        multiple: 2,
      },
    },
    {
      title: "Platform",
      dataIndex: "platform",
      key: "platform",
      sorter: {
        compare: (a, b) => a.platform - b.platform,
        multiple: 2,
      },
    },

    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Single Player",
      dataIndex: "singlePlayer",
      key: "singlePlayer",
      sorter: {
        compare: (a, b) => a.singlePlayer - b.singlePlayer,
        multiple: 2,
      },
    },
    {
      title: "Multi Player",
      dataIndex: "multiplayer",
      key: "multiplayer",
      sorter: {
        compare: (a, b) => a.multiplayer - b.multiplayer,
        multiple: 2,
      },
    },
    {
      title: "Action",
      key: "action",
      render: (res, index) => (
        <div>
          <button className="edit" value={res.id} onClick={handleEditGame} style={{ marginBottom: "10px" }}>
            <EditOutlined />
          </button>
          <button className="delete" value={res.id} onClick={handleDeleteGame}>
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  const data = dataGame;

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <>
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div className="game">
          <h1>Game Table List</h1>
          <div className="search-game">
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
          </div>
          <br />
          <br />
          <br />
          <div className="filter-game">
            <label>Genre</label>
            <input onChange={handleChangeGameFilter} type="text" name="genre" value={inputFilter.genre} />
            <label>Platform</label>
            <input onChange={handleChangeGameFilter} type="text" name="platform" value={inputFilter.platform} />
            <label>Release</label>
            <input onChange={handleChangeGameFilter} type="text" name="release" value={inputFilter.release} />
            <input type="submit" onClick={handleFilter} value="Filter" style={{ border: "none", background: "#001529", color: "white" }} />
          </div>
          <br />
          <button className="btn-clear-filter" onClick={handleClearFilter}>
            Clear Filter
          </button>
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Content>
    </>
  );
};
export default TableGame;

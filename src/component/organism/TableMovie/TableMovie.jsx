import React, { useEffect, useContext, useState } from "react";
import { Layout } from "antd";

import { Table } from "antd";
import { MovieContext } from "../../../context/MovieContext";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Input } from "antd";

const { Search } = Input;

const { Content } = Layout;
const TableMovie = () => {
  const [inputFilter, setInputFilter] = useState({
    genre: "",
    year: "",
    rating: "",
  });
  let { StateMovie, FunctionMovie } = useContext(MovieContext);
  let { dataMovie, setDataMovie, fetchStatus, setFetchStatus } = StateMovie;
  let { getDataMovie, handleDeleteMovie, handleEditMovie } = FunctionMovie;
  let shorten = (text, max) => {
    return text && text.length > max ? text.slice(0, max).split(" ").slice(0, -1).join(" ") : text;
  };
  useEffect(() => {
    if (fetchStatus) {
      getDataMovie();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);
  const onSearch = (value) => {
    let data = dataMovie;

    data = data.filter((filter) => filter.title.toLowerCase().includes(value.toLowerCase()));
    console.log(data);
    setDataMovie(
      data.map((d, index) => {
        let { id, image_url, title, year, duration, genre, rating, description } = d;
        let no = index + 1;
        return {
          id,
          image_url,
          title,
          year,
          duration,
          genre,
          rating,
          description,
        };
      })
    );
    if (fetchStatus) {
      getDataMovie();
      setFetchStatus(false);
    }
  };
  const handleChangeMovieFilter = (e) => {
    let value = e.target.value;
    let nameOfInput = e.target.name;
    setInputFilter({ ...inputFilter, [nameOfInput]: value });
    console.log(inputFilter);
  };
  const handleFilter = (event) => {
    event.preventDefault();

    let data = dataMovie;
    data = data.filter((value) => {
      let genre;
      if (inputFilter.genre === "") {
        genre = null;
      } else {
        genre = value.genre.toLowerCase().includes(inputFilter.genre.toLowerCase());
      }

      let year = parseInt(value.year) >= parseInt(inputFilter.year);
      let rating = parseInt(value.rating) >= parseInt(inputFilter.rating);

      return year || genre || rating;
    });

    setDataMovie(
      data.map((d, index) => {
        let { id, image_url, title, year, duration, genre, rating, description } = d;

        return {
          id,
          image_url,
          title,
          year,
          duration,
          genre,
          rating,
          description,
        };
      })
    );
    if (fetchStatus) {
      getDataMovie();
      setFetchStatus(false);
    }
    console.log(dataMovie);
  };
  const handleClearFilter = () => {
    setInputFilter({
      genre: "",
      year: "",
      rating: "",
    });
    console.log(inputFilter);

    // getDataMovie();
    setFetchStatus(true);
  };
  const columns = [
    {
      title: "Id",
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.length - b.title.length,
      //   sortOrder: sortedInfo.columnKey === "title" && sortedInfo.order,
      //   ellipsis: true,
      //   sortDirections: ["descend"],
      multiple: 2,
    },

    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: {
        compare: (a, b) => a.year - b.year,
        multiple: 2,
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      sorter: {
        compare: (a, b) => a.duration - b.duration,
        multiple: 2,
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (text.length > 50 ? shorten(text, 50) + "...." : text),
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      sorter: {
        compare: (a, b) => a.rating - b.rating,
        multiple: 2,
      },
    },
    {
      title: "Action",
      key: "action",
      render: (res, index) => (
        <div>
          <button className="edit" value={res.id} onClick={handleEditMovie} style={{ marginBottom: "10px" }}>
            <EditOutlined />
          </button>
          <button className="delete" value={res.id} onClick={handleDeleteMovie}>
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  const data = dataMovie;

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
        <div className="movie">
          <h1>Movie Table List</h1>
          <div className="search-movie">
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
          </div>
          <br />
          <br />
          <br />
          <form onSubmit={handleFilter}>
            <div className="filter-movie">
              <label>Genre</label>
              <input onChange={handleChangeMovieFilter} type="text" name="genre" value={inputFilter.genre} />
              <label>Release Year</label>
              <input onChange={handleChangeMovieFilter} type="text" name="year" value={inputFilter.year} />
              <label>Rating</label>
              <input onChange={handleChangeMovieFilter} type="text" name="rating" value={inputFilter.rating} />
              <input type="submit" value="Filter" style={{ border: "none", background: "#001529", color: "white", marginLeft: "10px" }} />
            </div>
          </form>
          <br />
          <button className="btn-clear-filter" style={{ border: "none", background: "#001529", color: "white", marginLeft: "10px" }} onClick={handleClearFilter}>
            Clear Filter
          </button>
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
      </Content>
    </>
  );
};
export default TableMovie;

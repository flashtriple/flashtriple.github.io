-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-02-2022 a las 20:21:44
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `stereo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `albums`
--

CREATE TABLE `albums` (
  `id` int(3) NOT NULL,
  `name` varchar(80) NOT NULL,
  `img` int(4) DEFAULT NULL,
  `year` year(4) DEFAULT NULL,
  `artist` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `albums`
--

INSERT INTO `albums` (`id`, `name`, `img`, `year`, `artist`) VALUES
(1, 'Doble vida', 1, 1988, 1),
(2, 'Ahí vamos', 2, 2006, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `artists`
--

CREATE TABLE `artists` (
  `id` int(3) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `artists`
--

INSERT INTO `artists` (`id`, `name`) VALUES
(1, 'Soda Stereo'),
(2, 'Gustavo Cerati');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `id` int(3) NOT NULL,
  `name` varchar(100) NOT NULL,
  `province` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`id`, `name`, `province`) VALUES
(1, 'Ituzaingo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `id` int(3) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `countries`
--

INSERT INTO `countries` (`id`, `name`) VALUES
(1, 'Argentina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dates`
--

CREATE TABLE `dates` (
  `id` int(6) NOT NULL,
  `place` int(5) NOT NULL,
  `datetime` datetime NOT NULL,
  `flyer` varchar(50) DEFAULT NULL,
  `price` int(6) DEFAULT NULL,
  `contact` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `dates`
--

INSERT INTO `dates` (`id`, `place`, `datetime`, `flyer`, `price`, `contact`) VALUES
(1, 1, '2022-02-08 21:30:00', NULL, NULL, '46240151');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imgs`
--

CREATE TABLE `imgs` (
  `id` int(4) NOT NULL,
  `url` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `imgs`
--

INSERT INTO `imgs` (`id`, `url`) VALUES
(1, '1.jpg'),
(2, '2.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nominations`
--

CREATE TABLE `nominations` (
  `id` int(1) NOT NULL,
  `votation` int(11) NOT NULL,
  `song` int(11) NOT NULL,
  `votes` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `nominations`
--

INSERT INTO `nominations` (`id`, `votation`, `song`, `votes`) VALUES
(1, 1, 1, 0),
(2, 1, 2, 0),
(3, 2, 4, 0),
(4, 2, 3, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `places`
--

CREATE TABLE `places` (
  `id` int(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `address` varchar(40) DEFAULT NULL,
  `ig` varchar(30) DEFAULT NULL,
  `city` int(3) NOT NULL,
  `phone` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `places`
--

INSERT INTO `places` (`id`, `name`, `address`, `ig`, `city`, `phone`) VALUES
(1, 'Zoo Café', 'Cnel. Pablo Zufriategui 701', 'lifezoocafe', 1, 46240151);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provincies`
--

CREATE TABLE `provincies` (
  `id` int(3) NOT NULL,
  `name` varchar(100) NOT NULL,
  `country` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `provincies`
--

INSERT INTO `provincies` (`id`, `name`, `country`) VALUES
(1, 'Buenos Aires', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `raffles`
--

CREATE TABLE `raffles` (
  `id` int(5) NOT NULL,
  `votation` int(5) NOT NULL,
  `winner` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `songs`
--

CREATE TABLE `songs` (
  `id` int(4) NOT NULL,
  `name` varchar(100) NOT NULL,
  `artist` int(3) NOT NULL,
  `year` year(4) DEFAULT NULL,
  `album` int(3) DEFAULT NULL,
  `votes` int(11) DEFAULT NULL,
  `img` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `songs`
--

INSERT INTO `songs` (`id`, `name`, `artist`, `year`, `album`, `votes`, `img`) VALUES
(1, 'En la ciudad de la furia', 1, 1988, 1, NULL, NULL),
(2, 'Crimen', 2, 2006, 2, NULL, NULL),
(3, 'Adios', 2, NULL, 2, NULL, NULL),
(4, 'Ella uso mi cabeza como un revolver', 1, 1990, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subscribers`
--

CREATE TABLE `subscribers` (
  `id` int(11) NOT NULL,
  `phone` int(15) NOT NULL,
  `votation` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votations`
--

CREATE TABLE `votations` (
  `id` int(5) NOT NULL,
  `date` int(6) NOT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `song` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `votations`
--

INSERT INTO `votations` (`id`, `date`, `active`, `song`) VALUES
(1, 1, 1, NULL),
(2, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votes`
--

CREATE TABLE `votes` (
  `id` int(8) NOT NULL,
  `phone` int(20) DEFAULT NULL,
  `ig` varchar(40) DEFAULT NULL,
  `song` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `votes`
--

INSERT INTO `votes` (`id`, `phone`, `ig`, `song`) VALUES
(4, 8768976, 'jhfjkyfku', 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `albums`
--
ALTER TABLE `albums`
  ADD PRIMARY KEY (`id`),
  ADD KEY `artist` (`artist`),
  ADD KEY `img` (`img`);

--
-- Indices de la tabla `artists`
--
ALTER TABLE `artists`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `province` (`province`);

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `dates`
--
ALTER TABLE `dates`
  ADD PRIMARY KEY (`id`),
  ADD KEY `place` (`place`);

--
-- Indices de la tabla `imgs`
--
ALTER TABLE `imgs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `nominations`
--
ALTER TABLE `nominations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `votation` (`votation`),
  ADD KEY `song` (`song`);

--
-- Indices de la tabla `places`
--
ALTER TABLE `places`
  ADD PRIMARY KEY (`id`),
  ADD KEY `city` (`city`);

--
-- Indices de la tabla `provincies`
--
ALTER TABLE `provincies`
  ADD PRIMARY KEY (`id`),
  ADD KEY `country` (`country`);

--
-- Indices de la tabla `raffles`
--
ALTER TABLE `raffles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `votation` (`votation`);

--
-- Indices de la tabla `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `img` (`img`),
  ADD KEY `album` (`album`),
  ADD KEY `artist` (`artist`);

--
-- Indices de la tabla `subscribers`
--
ALTER TABLE `subscribers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `votation` (`votation`);

--
-- Indices de la tabla `votations`
--
ALTER TABLE `votations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `date` (`date`),
  ADD KEY `active` (`active`);

--
-- Indices de la tabla `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `song` (`song`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `albums`
--
ALTER TABLE `albums`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `artists`
--
ALTER TABLE `artists`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `dates`
--
ALTER TABLE `dates`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `imgs`
--
ALTER TABLE `imgs`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `places`
--
ALTER TABLE `places`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `raffles`
--
ALTER TABLE `raffles`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `songs`
--
ALTER TABLE `songs`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `subscribers`
--
ALTER TABLE `subscribers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `votations`
--
ALTER TABLE `votations`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `votes`
--
ALTER TABLE `votes`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `albums`
--
ALTER TABLE `albums`
  ADD CONSTRAINT `albums_ibfk_1` FOREIGN KEY (`img`) REFERENCES `imgs` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `albums_ibfk_2` FOREIGN KEY (`artist`) REFERENCES `artists` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`province`) REFERENCES `provincies` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `dates`
--
ALTER TABLE `dates`
  ADD CONSTRAINT `dates_ibfk_1` FOREIGN KEY (`place`) REFERENCES `places` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `nominations`
--
ALTER TABLE `nominations`
  ADD CONSTRAINT `nominations_ibfk_1` FOREIGN KEY (`votation`) REFERENCES `votations` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `nominations_ibfk_2` FOREIGN KEY (`song`) REFERENCES `songs` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `places`
--
ALTER TABLE `places`
  ADD CONSTRAINT `places_ibfk_1` FOREIGN KEY (`city`) REFERENCES `cities` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `provincies`
--
ALTER TABLE `provincies`
  ADD CONSTRAINT `provincies_ibfk_1` FOREIGN KEY (`country`) REFERENCES `countries` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `raffles`
--
ALTER TABLE `raffles`
  ADD CONSTRAINT `raffles_ibfk_1` FOREIGN KEY (`votation`) REFERENCES `votations` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `songs`
--
ALTER TABLE `songs`
  ADD CONSTRAINT `songs_ibfk_1` FOREIGN KEY (`img`) REFERENCES `imgs` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `songs_ibfk_2` FOREIGN KEY (`artist`) REFERENCES `artists` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `subscribers`
--
ALTER TABLE `subscribers`
  ADD CONSTRAINT `subscribers_ibfk_1` FOREIGN KEY (`votation`) REFERENCES `votations` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `votations`
--
ALTER TABLE `votations`
  ADD CONSTRAINT `votations_ibfk_1` FOREIGN KEY (`date`) REFERENCES `dates` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`song`) REFERENCES `songs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

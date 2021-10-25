--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.8 (Ubuntu 12.8-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: balances; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.balances (
    id integer NOT NULL,
    user_id integer NOT NULL,
    date date NOT NULL,
    description text,
    balance numeric
);


ALTER TABLE public.balances OWNER TO postgres;

--
-- Name: balances_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.balances_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.balances_id_seq OWNER TO postgres;

--
-- Name: balances_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.balances_id_seq OWNED BY public.balances.id;


--
-- Name: logged_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.logged_users (
    id integer NOT NULL,
    user_id integer NOT NULL,
    token text NOT NULL
);


ALTER TABLE public.logged_users OWNER TO postgres;

--
-- Name: logged_users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.logged_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.logged_users_id_seq OWNER TO postgres;

--
-- Name: logged_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.logged_users_id_seq OWNED BY public.logged_users.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    online boolean
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: balances id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.balances ALTER COLUMN id SET DEFAULT nextval('public.balances_id_seq'::regclass);


--
-- Name: logged_users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logged_users ALTER COLUMN id SET DEFAULT nextval('public.logged_users_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: balances; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.balances (id, user_id, date, description, balance) FROM stdin;
1	4	2021-10-20	PizzaCo	34.70
2	4	2021-10-20	McDonalds	60.73
3	4	2021-10-20	Netflex	50.00
4	4	2021-10-20	MacBook	-100.00
6	5	2021-10-10	toddynho	-55.00
7	4	2021-10-22	teste	-100
8	4	2021-10-22	teste	100
12	4	2021-10-22	olokinho	\N
13	4	2021-10-22	olokinho	\N
14	4	2021-10-22	olokinho	45.50
15	4	2021-10-22	teste	-700
16	4	2021-10-22	novo teste	85
17	4	2021-10-22	testinho	-55.96
18	4	2021-10-22	eita	-60
19	4	2021-10-22	dad	78
20	4	2021-10-22	eweq	-65
21	6	2021-10-22	Teste	45
22	4	2021-10-22	Teste server	1000
\.


--
-- Data for Name: logged_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.logged_users (id, user_id, token) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, online) FROM stdin;
\.


--
-- Name: balances_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.balances_id_seq', 22, true);


--
-- Name: logged_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.logged_users_id_seq', 42, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 200, true);


--
-- Name: balances balances_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.balances
    ADD CONSTRAINT balances_pkey PRIMARY KEY (id);


--
-- Name: logged_users logged_users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.logged_users
    ADD CONSTRAINT logged_users_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--


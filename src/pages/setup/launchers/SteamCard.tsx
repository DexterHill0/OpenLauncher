import React, { useState } from "react";

import { toast } from "../../../providers/ToastProvider";
import Requests from "../../../scripts/Requests";

import Input from "../../../components/primitives/Input";
import { IoLockClosedOutline, IoPersonOutline } from "react-icons/io5";
import Icon from "../../../components/icons/Icon";
import Text from "../../../components/primitives/Text";
import Button from "../../../components/primitives/Button";
import SkeletonImage from "../../../components/SkeletonImage";
import Item from "../../../components/primitives/Item";
import Separator from "../../../components/Separator";
import LoadingSpinner from "../../../components/LoadingSpinner";

import styles from "../../css/setup/launchers/SteamCard.module.css";

const SteamCard: React.FC = () => {

	const [isLoading, setIsLoading] = useState(false);

	//username + password
	const [data, setData] = useState({ u: "", p: "" });

	const submitForm = () => {
		toast("info!");

		setIsLoading(true);
	}

	return (
		<div>
			<div className={styles.steamText}>
				<Text fontSize="2.1rem" fontWeight={200}>Steam</Text>
			</div>
			<Item
				start={<img src="/assets/logos/steam_logo.svg" width={40} height={40}></img>}
				middle={
					<form className={styles.detailsForm} id="steam_form" onSubmit={submitForm}>
						<Input
							icon={<Icon icon={IoPersonOutline}></Icon>}
							placeholder="Username"
							height="3rem"
							width="20rem"
							required
							onChange={(e) => setData({ ...data, u: e.target.value })}
						></Input>

						<Input
							icon={<Icon icon={IoLockClosedOutline}></Icon>}
							placeholder="Password"
							type="password"
							height="3rem"
							width="20rem"
							required
							onChange={(e) => setData({ ...data, p: e.target.value })}
						></Input>
					</form>
				}
				end={
					isLoading ?
						<LoadingSpinner></LoadingSpinner>
						: <></>
				}
			>
			</Item>
			<div className={styles.container}>
				<Separator class={styles.separator}></Separator>

				<Button width="10rem" height="2.5rem" submit={{ formId: "steam_form" }} gradientType="light" animateOnHover disabled={isLoading}>
					<Text fontSize="1rem" fontWeight={400}>Sign In</Text>
				</Button>
			</div>
		</div>
	)
}

export default SteamCard;
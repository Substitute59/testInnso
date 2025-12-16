import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const getFormattedDate = (dateISO) => {
	const date = new Date(dateISO);
	const year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();
	let hours = date.getHours();
	let minutes = date.getMinutes();

	if (day < 10) {
		day = '0' + day;
	}
	if (month < 10) {
		month = '0' + month;
	}
	if (hours < 10) {
		hours = '0' + hours;
	}
	if (minutes < 10) {
		minutes = '0' + minutes;
	}

	return `${day}/${month}/${year} ${hours}:${minutes}`;
}

export default new Vuex.Store({
	state: {
		mockDataList: [],
		filteredStatus: null,
		filteredRead: null,
		status: [
			{text: 'Choisissez', value:''},
			{text: 'reserved', value:'reserved'},
			{text: 'waiting', value:'waiting'},
			{text: 'inProgress', value:'inProgress'},
			{text: 'toTreat', value:'toTreat'},
			{text: 'finished', value:'finished'}
		],
		read: [
			{text: 'Choisissez', value:''},
			{text: 'Oui', value: 'yes'},
			{text: 'Non', value: 'no'}
		],
		attachmentDialog: false,
		currentAttachment: '',
		dataDialog: false,
		currentData: '',
		currentStatus: null
	},
	mutations: {
		init(state, data) {
			const formattedMockDataList = data.map(item => {
				item.interaction_creation_date = getFormattedDate(item.interaction_creation_date);
				item.due_date = getFormattedDate(item.due_date);
				const customer = item.customer;
				customer.birthday = getFormattedDate(customer.birthday);
				const read = {read: 'no'};
				delete item.customer;
				return {...item, ...customer, ...read};
			});
			state.mockDataList = formattedMockDataList;
		},
		filterByStatus(state, newStatus) {
			state.filteredStatus = newStatus;
		},
		filterByRead(state, newRead) {
			state.filteredRead = newRead;
		},
		openAttachmentDialog(state, attachment) {
			state.attachmentDialog = true;
			state.currentAttachment = attachment;
		},
		closeAttachmentDialog(state) {
			state.attachmentDialog = false;
			state.currentAttachment = '';
		},
		openDataDialog(state, data) {
			state.dataDialog = true;
			state.currentData = data;
			state.currentStatus = {text: data.status, value:data.status};
		},
		closeDataDialog(state, id) {
			state.dataDialog = false;
			state.currentData = null;
			state.currentStatus = null;
			state.mockDataList.map(item => {
				if (item.id === id) {
					item.read = 'yes';
				}
				return item;
			});
		},
		changeStatus(state, data) {
			state.mockDataList.map(item => {
				if (item.id === data.id) {
					item.status = data.newStatus;
				}
				return item;
			});
		}
	},
	actions: {
		init(context) {
			axios.get('data/MOCK_DATA.json')
				.then(response => {
					context.commit('init', response.data);
				});
		},
		filterByStatus(context, newStatus) {
			context.commit('filterByStatus', newStatus);
		},
		filterByRead(context, newRead) {
			context.commit('filterByRead', newRead);
		},
		openAttachmentDialog(context, attachment) {
			context.commit('openAttachmentDialog', attachment);
		},
		closeAttachmentDialog(context) {
			context.commit('closeAttachmentDialog');
		},
		openDataDialog(context, data) {
			context.commit('openDataDialog', data);
		},
		closeDataDialog(context, id) {
			context.commit('closeDataDialog', id);
		},
		changeStatus(context, data) {
			context.commit('changeStatus', data);
		}
	}
});
